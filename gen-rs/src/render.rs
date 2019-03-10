use std::io::{Cursor, Result, Write};
use std::path::PathBuf;

use imagesize::ImageSize;
use lazy_static::lazy_static;
use orgize::export::*;
use syntect::html::{tokens_to_classed_spans, ClassStyle};
use syntect::parsing::{ParseState, SyntaxSet};
use url::Url;

use crate::error;

pub fn render(content: &str, amp: bool) -> error::Result<String> {
    let mut cursor = Cursor::new(Vec::with_capacity(content.len()));
    HtmlRender::new(SolomonHtmlHandler { amp }, &mut cursor, content).render()?;
    Ok(String::from_utf8(cursor.into_inner())?)
}

lazy_static! {
    static ref SYNTAX_SET: SyntaxSet = {
        let set = SyntaxSet::load_defaults_newlines();
        let mut builder = set.into_builder();
        // add extra language syntax files
        builder.add_from_folder("gen-rs/syntax", true).unwrap();
        builder.build()
    };
}

struct SolomonHtmlHandler {
    amp: bool,
}

#[inline]
fn remap_lang(lang: &str) -> &str {
    match lang {
        "elisp" | "emacs-lisp" => "lisp",
        _ => lang,
    }
}

impl<W: Write> HtmlHandler<W> for SolomonHtmlHandler {
    fn handle_src_block(&mut self, w: &mut W, cont: &str, args: Option<&str>) -> Result<()> {
        let syntax = args
            .map(|a| a.trim().split_ascii_whitespace().next().unwrap_or(a))
            .map(|lang| remap_lang(lang))
            .and_then(|lang| SYNTAX_SET.find_syntax_by_token(lang));
        let lines = cont.as_bytes().iter().filter(|&&c| c == b'\n').count();
        let pad = if lines < 10 {
            1
        } else if lines < 100 {
            2
        } else {
            3
        };

        if let Some(syntax) = syntax {
            let mut state = ParseState::new(&syntax);
            let mut spans = 0;

            write!(w, "<pre><code>")?;

            for (i, line) in cont.lines().enumerate() {
                let (line, delta) = tokens_to_classed_spans(
                    line,
                    &state.parse_line(line, &SYNTAX_SET),
                    ClassStyle::Spaced,
                );
                spans += delta;

                if lines > 4 {
                    write!(w, r#"<span class="line-number">{:1$} </span>"#, i + 1, pad)?;
                }
                writeln!(w, "{}", line)?;
            }

            write!(w, "{:1$}</pre></code>", "</span>", spans as usize)
        } else {
            if lines > 4 {
                write!(w, "<pre><code>")?;
                for (index, line) in cont.lines().enumerate() {
                    writeln!(
                        w,
                        r#"<span class="line-number">{:1$} </span>{2}"#,
                        index + 1,
                        pad,
                        line
                    )?;
                }
                write!(w, "</code></pre>")
            } else {
                write!(w, "<pre><code>{}</code></pre>", cont)
            }
        }
    }

    fn handle_link(&mut self, w: &mut W, path: &str, desc: Option<&str>) -> Result<()> {
        let url = Url::parse(path).unwrap();
        if url.scheme() == "file" {
            let path = &url.path()[1..];

            let ImageSize { width, height } =
                imagesize::size(PathBuf::from(r"content/post").join(path)).unwrap();

            if self.amp {
                write!(
                    w,
                    r#"<amp-img src="{}" alt="" height="{}" width="{}"></amp-img>"#,
                    path, height, width
                )
            } else {
                write!(
                    w,
                    r#"<div class="image-container"><div class="image" style="background-image: url({});padding-top: {:.7}%"></div></div>"#,
                    path,
                    (height as f32 / width as f32) * 100.
                )
            }
        } else if let Some(desc) = desc {
            write!(w, r#"<a href="{}">{}</a>"#, path, desc)
        } else {
            write!(w, r#"<a href="{0}">{0}</a>"#, path)
        }
    }
}
