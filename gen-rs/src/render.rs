use std::io::{Cursor, Result, Write};
use std::path::PathBuf;

use crate::error;
use imagesize::ImageSize;
use lazy_static::lazy_static;
use orgize::export::*;
use syntect::html::{tokens_to_classed_spans, ClassStyle};
use syntect::parsing::{ParseState, SyntaxSet};
use url::Url;

pub fn render(content: &str, amp: bool) -> error::Result<String> {
    let mut cursor = Cursor::new(Vec::with_capacity(content.len()));
    HtmlRender::new(SolomonHtmlHandler { amp }, &mut cursor, content).render()?;
    Ok(String::from_utf8(cursor.into_inner())?)
}

lazy_static! {
    static ref SYNTAX_SET: SyntaxSet = SyntaxSet::load_defaults_newlines();
}

struct SolomonHtmlHandler {
    amp: bool,
}

impl<W: Write> HtmlHandler<W> for SolomonHtmlHandler {
    fn handle_src_block(&mut self, w: &mut W, cont: &str, args: Option<&str>) -> Result<()> {
        let syntax = args
            .map(|a| a.trim().split_ascii_whitespace().next().unwrap_or(a))
            .and_then(|l| SYNTAX_SET.find_syntax_by_token(l));

        if let Some(syntax) = syntax {
            let mut state = ParseState::new(&syntax);
            let mut spans = 0;

            write!(w, "<pre><code>")?;

            for line in cont.lines() {
                let (line, delta) = tokens_to_classed_spans(
                    line,
                    &state.parse_line(line, &SYNTAX_SET),
                    ClassStyle::Spaced,
                );
                spans += delta;
                writeln!(w, "{}", line)?;
            }

            assert!(spans >= 0);

            write!(w, "{:1$}</pre></code>", "</span>", spans as usize)
        } else {
            write!(w, "<pre><code>{}</code></pre>", cont)
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
