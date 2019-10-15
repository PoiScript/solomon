#![allow(clippy::unreadable_literal)]

use chrono::{DateTime, NaiveDateTime, Utc};
use orgize::{
    export::{html::Escape, DefaultHtmlHandler, HtmlHandler},
    Element,
};
use std::{io::Write, path::Path, process::Command};
use syntect::{
    easy::HighlightLines,
    highlighting::ThemeSet,
    html::{styled_line_to_highlighted_html, IncludeBackground},
    parsing::SyntaxSet,
};

use crate::error::{Error, Result};

#[derive(Default)]
struct SolomonBaseHandler {
    default: DefaultHtmlHandler,
    last_char: Option<char>,
}

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
            Element::Document => (),
            Element::InlineSrc(inline_src) => write!(
                w,
                "<code>{}</code>",
                self.highlight(Some(&inline_src.lang), &inline_src.body)
            )?,
            Element::SourceBlock(block) => write!(
                w,
                "<pre><code>{}</code></pre>",
                self.highlight(Some(&block.language), &block.contents)
            )?,
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
                    let date =
                        DateTime::from_utc(NaiveDateTime::from_timestamp(1382071200, 0), Utc);

                    write!(w, " {} ", (Utc::now() - date).num_days())?;
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
            Element::Paragraph => {
                self.last_char = None;
                write!(w, "<p>")?;
            }
            Element::Link(link) => {
                let text = link.desc.as_ref().unwrap_or(&link.path);
                if should_insert_space(self.last_char, text.chars().next()) {
                    write!(w, " ")?;
                }
                self.last_char = text.chars().last();
                write!(w, "<a href=\"{}\">{}</a>", Escape(&link.path), Escape(text))?;
            }
            Element::Text { value } => {
                for line in value.lines() {
                    let text = line.trim();
                    if should_insert_space(self.last_char, text.chars().next()) {
                        write!(w, " ")?;
                    }
                    self.last_char = text.chars().last();
                    write!(w, "{}", Escape(text))?;
                }
            }
            Element::Verbatim { value } | Element::Code { value } => {
                let text = value.trim();
                if should_insert_space(self.last_char, text.chars().next()) {
                    write!(w, " ")?;
                }
                self.last_char = text.chars().last();
                write!(w, "<code>{}</code>", Escape(text))?;
            }
            _ => self.default.start(w, element)?,
        }
        Ok(())
    }

    fn end<W: Write>(&mut self, w: W, element: &Element<'_>) -> Result<()> {
        match element {
            Element::Document => (),
            _ => self.default.end(w, element)?,
        }
        Ok(())
    }
}

#[derive(Default)]
pub struct SolomonHtmlHandler(SolomonBaseHandler);

impl HtmlHandler<Error> for SolomonHtmlHandler {
    fn start<W: Write>(&mut self, mut w: W, element: &Element<'_>) -> Result<()> {
        match element {
            Element::Link(link) if link.path.starts_with("file:") => {
                let size = imagesize::size(Path::new("content/post").join(&link.path[5..]))?;

                write!(
                    w,
                    "<div class=\"image-container\">\
                     <div class=\"image\" style=\"background-image:url(/{});padding-top:{:.7}%\">\
                     </div></div>",
                    link.path,
                    (size.height as f32 / size.width as f32) * 100.
                )?;
            }
            _ => self.0.start(w, element)?,
        }

        Ok(())
    }

    fn end<W: Write>(&mut self, w: W, element: &Element<'_>) -> Result<()> {
        self.0.end(w, element)
    }
}

#[derive(Default)]
pub struct SolomonRssHandler(SolomonBaseHandler);

impl HtmlHandler<Error> for SolomonRssHandler {
    fn start<W: Write>(&mut self, mut w: W, element: &Element<'_>) -> Result<()> {
        match element {
            Element::Link(link) if link.path.starts_with("file:") => {
                let size = imagesize::size(Path::new("content/post").join(&link.path[5..]))?;

                write!(
                    w,
                    r#"<img src="/{}" width="{}" height="{}">"#,
                    link.path, size.width, size.height
                )?;
            }
            _ => self.0.start(w, element)?,
        }

        Ok(())
    }

    fn end<W: Write>(&mut self, w: W, element: &Element<'_>) -> Result<()> {
        self.0.end(w, element)
    }
}

#[derive(Default)]
pub struct SolomonAmpHandler(SolomonBaseHandler);

impl HtmlHandler<Error> for SolomonAmpHandler {
    fn start<W: Write>(&mut self, mut w: W, element: &Element<'_>) -> Result<()> {
        match element {
            Element::Link(link) if link.path.starts_with("file:") => {
                let size = imagesize::size(Path::new("content/post").join(&link.path[5..]))?;

                write!(
                    w,
                    "<amp-img src=\"/{}\" width=\"{}\" height=\"{}\" layout=\"responsive\" \
                     class=\"i-amphtml-layout-responsive i-amphtml-layout-size-defined\" i-amphtml-layout=\"responsive\">\
                     <i-amphtml-sizer style=\"display:block;padding-top:{:.7}%;\"></i-amphtml-sizer></amp-img>",
                    link.path,
                    size.width,
                    size.height,
                    (size.height as f32 / size.width as f32) * 100.
                )?;
            }
            _ => self.0.start(w, element)?,
        }

        Ok(())
    }

    fn end<W: Write>(&mut self, w: W, element: &Element<'_>) -> Result<()> {
        self.0.end(w, element)
    }
}

fn write_nodejs_package_version<W: Write>(mut w: W, package: &str) -> Result<()> {
    write!(w, "<code>")?;

    let output = Command::new("yarn")
        .args(&["--cwd", "web", "--silent", "list", "--pattern", package])
        .output()?;

    let stdout = String::from_utf8(output.stdout)?;

    if let Some(version) = stdout.trim().split_whitespace().last() {
        write!(w, "{}", version)?;
    }

    write!(w, "</code>")?;

    Ok(())
}

fn should_insert_space(c1: Option<char>, c2: Option<char>) -> bool {
    const PUNCTUATIONS: [char; 14] = [
        '。', '？', '，', '、', '；', '：', '“', '”', '「', '」', '（', '）', '《', '》',
    ];

    if let (Some(c1), Some(c2)) = (c1, c2) {
        (c1.is_ascii_graphic() && c2.is_ascii_graphic())
            || (c1.is_ascii_graphic()
                && 0x4E00 < (c2 as u32)
                && (c2 as u32) < 0x9FFF
                && !PUNCTUATIONS.contains(&c2))
            || (c2.is_ascii_graphic()
                && 0x4E00 < (c1 as u32)
                && (c1 as u32) < 0x9FFF
                && !PUNCTUATIONS.contains(&c1))
    } else {
        false
    }
}
