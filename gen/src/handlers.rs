#![allow(clippy::unreadable_literal)]

use chrono::Utc;
use imagesize::size;
use orgize::{
    export::{html::Escape, DefaultHtmlHandler, HtmlHandler},
    Element,
};
use std::{io::Write, path::PathBuf, process::Command};
use syntect::{
    easy::HighlightLines,
    highlighting::ThemeSet,
    html::{styled_line_to_highlighted_html, IncludeBackground},
    parsing::SyntaxSet,
};
use url::Url;

use crate::error::{Error, Result};

pub struct SolomonBaseHandler(DefaultHtmlHandler);

impl SolomonBaseHandler {
    fn highlight(&self, language: Option<&str>, content: &str) -> String {
        lazy_static::lazy_static! {
            static ref SYNTAX_SET: SyntaxSet = {
                let set = SyntaxSet::load_defaults_newlines();
                let mut builder = set.into_builder();
                // add extra language syntax files
                builder.add_from_folder("gen/syntax", true).unwrap();
                builder.build()
            };
            static ref THEME_SET: ThemeSet = ThemeSet::load_defaults();
        }

        let language = match language {
            Some("elisp") | Some("emacs-lisp") => Some("lisp"),
            _ => language,
        };
        let mut highlighter = HighlightLines::new(
            language
                .and_then(|lang| SYNTAX_SET.find_syntax_by_token(lang))
                .unwrap_or_else(|| SYNTAX_SET.find_syntax_plain_text()),
            &THEME_SET.themes["InspiredGitHub"],
        );
        let regions = highlighter.highlight(content, &SYNTAX_SET);
        styled_line_to_highlighted_html(&regions[..], IncludeBackground::No)
    }
}

impl HtmlHandler<Error> for SolomonBaseHandler {
    fn start<W: Write>(&mut self, mut w: W, element: &Element<'_>) -> Result<()> {
        match element {
            Element::InlineSrc(inline_src) => write!(
                w,
                "<code>{}</code>",
                self.highlight(Some(&inline_src.lang), &inline_src.body)
            )?,
            Element::SourceBlock(block) => {
                if block.language.is_empty() {
                    write!(w, "<pre><code>{}</code></pre>", block.contents)?;
                } else {
                    write!(
                        w,
                        "<pre><code>{}</code></pre>",
                        self.highlight(Some(&block.language), &block.contents)
                    )?
                }
            }
            Element::FixedWidth { value } => {
                write!(w, "<pre><code>{}</code></pre>", self.highlight(None, value))?
            }
            Element::ExampleBlock(block) => write!(
                w,
                "<pre><code>{}</code></pre>",
                self.highlight(None, &block.contents)
            )?,
            Element::Macros(macros) => match &macros.name as &str {
                "age-days" => {
                    write!(w, " {:.} ", (Utc::now().timestamp() - 1382071200) / 86400)?;
                }
                "angular-core-version" => {
                    write_nodejs_package_version(w, "@angular/core")?;
                }
                "angular-material-version" => {
                    write_nodejs_package_version(w, "@angular/material")?;
                }
                "angular-cli-version" => {
                    write_nodejs_package_version(w, "@angular/cli")?;
                }
                _ => (),
            },
            Element::Link(link) => {
                if let Some(desc) = &link.desc {
                    write!(
                        w,
                        r#"<a href="{}">{}</a>"#,
                        Escape(&link.path),
                        Escape(desc)
                    )?;
                } else {
                    write!(w, r#"<a href="{0}">{0}</a>"#, Escape(&link.path))?;
                }
            }
            _ => self.0.start(w, element)?,
        }
        Ok(())
    }
}

pub struct SolomonHtmlHandler(SolomonBaseHandler);

impl Default for SolomonHtmlHandler {
    fn default() -> Self {
        SolomonHtmlHandler(SolomonBaseHandler(DefaultHtmlHandler))
    }
}

impl HtmlHandler<Error> for SolomonHtmlHandler {
    fn start<W: Write>(&mut self, mut w: W, element: &Element<'_>) -> Result<()> {
        if let Element::Link(link) = element {
            let url = Url::parse(&link.path)?;
            if url.scheme() == "file" {
                let size = size(PathBuf::from(r"content/post").join(&url.path()[1..]))?;

                write!(
                    w,
                    "<div class=\"image-container\">\
                     <div class=\"image\" style=\"background-image: url({});padding-top: {:.7}%\">\
                     </div></div>",
                    url.path(),
                    (size.height as f32 / size.width as f32) * 100.
                )?;
            } else {
                self.0.start(w, element)?;
            }

            Ok(())
        } else {
            self.0.start(w, element)
        }
    }
}

pub struct SolomonRssHandler(SolomonBaseHandler);

impl Default for SolomonRssHandler {
    fn default() -> Self {
        SolomonRssHandler(SolomonBaseHandler(DefaultHtmlHandler))
    }
}

impl HtmlHandler<Error> for SolomonRssHandler {
    fn start<W: Write>(&mut self, mut w: W, element: &Element<'_>) -> Result<()> {
        if let Element::Link(link) = element {
            let url = Url::parse(&link.path)?;
            if url.scheme() == "file" {
                let size = size(PathBuf::from(r"content/post").join(&url.path()[1..]))?;

                write!(
                    w,
                    r#"<img src="{}" width="{}" height="{}">"#,
                    url.path(),
                    size.width,
                    size.height
                )?;
            } else {
                self.0.start(w, element)?;
            }
        } else {
            self.0.start(w, element)?;
        }

        Ok(())
    }
}

fn write_nodejs_package_version<W: Write>(mut w: W, package: &str) -> Result<()> {
    write!(w, "<code>")?;

    let output = Command::new("yarn")
        .args(&["--cwd", "web", "--silent", "list", "--pattern", package])
        .output()?;

    let output = String::from_utf8(output.stdout)?;

    if let Some(version) = output.trim().split_whitespace().last() {
        write!(w, "{}", version)?;
    }

    write!(w, "</code>")?;

    Ok(())
}

// fn should_insert_space(c1: char, c2: char) -> bool {
//     const CHINESE_PUNCTUATION: [char; 14] = [
//         '。', '？', '，', '、', '；', '：', '“', '”', '「', '」', '（', '）', '《', '》',
//     ];

//     (c1.is_ascii_graphic() && c2.is_ascii_graphic())
//         || (c1.is_ascii_graphic()
//             && 0x4E00 < (c2 as u32)
//             && (c2 as u32) < 0x9FFF
//             && !CHINESE_PUNCTUATION.contains(&c2))
//         || (c2.is_ascii_graphic()
//             && 0x4E00 < (c1 as u32)
//             && (c1 as u32) < 0x9FFF
//             && !CHINESE_PUNCTUATION.contains(&c1))
// }
