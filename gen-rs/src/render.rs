use std::io::{Cursor, Write};
use std::path::PathBuf;

use crate::error::{Error, Result};
use html_minifier::minify;
use imagesize::{size, ImageSize};
use lazy_static::lazy_static;
use orgize::export::*;
use syntect::easy::HighlightLines;
use syntect::highlighting::ThemeSet;
use syntect::html::{styled_line_to_highlighted_html, IncludeBackground};
use syntect::parsing::SyntaxSet;
use url::Url;

pub fn render(content: &str, amp: bool) -> Result<String> {
    let mut cursor = Cursor::new(Vec::with_capacity(content.len()));
    HtmlRender::new(SolomonHtmlHandler { amp }, &mut cursor, content).render()?;
    let html = String::from_utf8(cursor.into_inner())?;
    minify(html).map_err(Error::Minifier)
}

lazy_static! {
    static ref SYNTAX_SET: SyntaxSet = {
        let set = SyntaxSet::load_defaults_newlines();
        let mut builder = set.into_builder();
        // add extra language syntax files
        builder.add_from_folder("gen-rs/syntax", true).unwrap();
        builder.build()
    };
    static ref THEME_SET: ThemeSet = ThemeSet::load_defaults();
}

struct SolomonHtmlHandler {
    amp: bool,
}

impl SolomonHtmlHandler {
    fn get_highlighter(&self, lang: Option<&str>) -> HighlightLines {
        if let Some(lang) = lang {
            // remap language identifier to something that syntect can recognize
            let lang = match lang {
                "elisp" | "emacs-lisp" => "lisp",
                _ => lang,
            };
            let syntax = SYNTAX_SET.find_syntax_by_token(lang);

            if let Some(syntax) = syntax {
                return HighlightLines::new(syntax, &THEME_SET.themes["InspiredGitHub"]);
            }

            eprintln!("syntax not found for language {}", lang);
        }

        HighlightLines::new(
            SYNTAX_SET.find_syntax_plain_text(),
            &THEME_SET.themes["InspiredGitHub"],
        )
    }
}

impl<W: Write> HtmlHandler<W, Error> for SolomonHtmlHandler {
    fn handle_src_block(&mut self, w: &mut W, cont: &str, args: Option<&str>) -> Result<()> {
        let lang = args.map(|a| a.trim().split_ascii_whitespace().next().unwrap_or(a));
        let lines = cont.as_bytes().iter().filter(|&&c| c == b'\n').count();
        let pad = if lines < 10 {
            1
        } else if lines < 100 {
            2
        } else {
            3
        };

        write!(w, "<pre><code>")?;

        let mut highlighter = self.get_highlighter(lang);

        for (i, line) in cont.lines().enumerate() {
            if lines > 4 {
                write!(w, r#"<span class="line-number">{:1$} </span>"#, i + 1, pad)?;
            }
            let regions = highlighter.highlight(line, &SYNTAX_SET);
            let html = styled_line_to_highlighted_html(&regions[..], IncludeBackground::No);
            writeln!(w, "{}", html)?;
        }

        write!(w, "</pre></code>").map_err(Error::IO)
    }

    fn handle_inline_src(
        &mut self,
        w: &mut W,
        lang: &str,
        _: Option<&str>,
        body: &str,
    ) -> Result<()> {
        let mut highlighter = self.get_highlighter(Some(lang));
        let regions = highlighter.highlight(body, &SYNTAX_SET);
        let html = styled_line_to_highlighted_html(&regions[..], IncludeBackground::No);

        write!(w, "<code>{}</code>", html).map_err(Error::IO)
    }

    fn handle_link(&mut self, w: &mut W, path: &str, desc: Option<&str>) -> Result<()> {
        let url = Url::parse(path).unwrap();
        if url.scheme() == "file" {
            let path = &url.path()[1..];

            let ImageSize { width, height } = size(PathBuf::from(r"content/post").join(path))?;

            if self.amp {
                write!(
                    w,
                    r#"<amp-img lightbox src="/{}" alt="" height="{}" width="{}" layout="responsive"></amp-img>"#,
                    path, height, width
                )?;
            } else {
                write!(
                    w,
                    r#"<div class="image-container"><div class="image" style="background-image: url(/{});padding-top: {:.7}%"></div></div>"#,
                    path,
                    (height as f32 / width as f32) * 100.
                )?;
            }
        } else if let Some(desc) = desc {
            write!(w, r#"<a href="{}">{}</a>"#, path, desc)?;
        } else {
            write!(w, r#"<a href="{0}">{0}</a>"#, path)?;
        }

        Ok(())
    }
}
