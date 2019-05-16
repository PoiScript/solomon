use crate::error::{Error, Result};
use imagesize::{size, ImageSize};
use lazy_static::lazy_static;
use orgize::{
    export::*,
    objects::{InlineSrc, Link, Macros},
};
use std::{
    io::{Cursor, Write},
    path::PathBuf,
};
use syntect::{
    easy::HighlightLines,
    highlighting::ThemeSet,
    html::{styled_line_to_highlighted_html, IncludeBackground},
    parsing::SyntaxSet,
};
use url::Url;

pub fn render(content: &str) -> Result<String> {
    let mut cursor = Cursor::new(Vec::with_capacity(content.len()));
    HtmlRender::new(
        SolomonHtmlHandler { last_char: '。' },
        &mut cursor,
        content,
    )
    .render()?;
    Ok(String::from_utf8(cursor.into_inner())?)
}

lazy_static! {
    static ref SYNTAX_SET: SyntaxSet = {
        let set = SyntaxSet::load_defaults_newlines();
        let mut builder = set.into_builder();
        // add extra language syntax files
        builder.add_from_folder("gen/syntax", true).unwrap();
        builder.build()
    };
    static ref THEME_SET: ThemeSet = ThemeSet::load_defaults();
}

struct SolomonHtmlHandler {
    last_char: char,
}

impl SolomonHtmlHandler {
    fn get_highlighter(&self, lang: Option<&str>) -> HighlightLines {
        if let Some(lang) = lang {
            // alias
            let lang = match lang {
                "elisp" | "emacs-lisp" => "lisp",
                _ => lang,
            };

            if let Some(syntax) = SYNTAX_SET.find_syntax_by_token(lang) {
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
    fn src_block(&mut self, w: &mut W, cont: &str, args: Option<&str>) -> Result<()> {
        let lang = args.map(|a| a.trim().split_ascii_whitespace().next().unwrap_or(a));
        let lines = cont.as_bytes().iter().filter(|&&c| c == b'\n').count() + 1;
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

        Ok(write!(w, "</pre></code>")?)
    }

    fn inline_src(&mut self, w: &mut W, src: InlineSrc) -> Result<()> {
        let mut highlighter = self.get_highlighter(Some(src.lang));
        let regions = highlighter.highlight(src.body, &SYNTAX_SET);
        let html = styled_line_to_highlighted_html(&regions[..], IncludeBackground::No);

        Ok(write!(w, "<code>{}</code>", html)?)
    }

    fn link(&mut self, w: &mut W, link: Link) -> Result<()> {
        let url = Url::parse(link.path)?;
        if url.scheme() == "file" {
            let path = &url.path()[1..];
            let ImageSize { width, height } = size(PathBuf::from(r"content/post").join(path))?;

            write!(
                w,
                "<div class=\"image-container\">\
                 <div class=\"image\" style=\"background-image: url(/{});padding-top: {:.7}%\">\
                 </div></div>",
                path,
                (height as f32 / width as f32) * 100.
            )?;
        } else {
            let text = link.desc.unwrap_or(link.path);
            if should_insert_space(self.last_char, text.chars().next().unwrap()) {
                write!(w, " ")?;
                self.last_char = '。';
            }
            write!(w, r#"<a href=""#)?;
            self.text(w, link.path)?;
            write!(w, r#"">"#)?;
            self.text(w, text)?;
            write!(w, "</a>")?;
        }

        Ok(())
    }

    fn macros(&mut self, w: &mut W, macros: Macros<'_>) -> Result<()> {
        use chrono::offset::Utc;
        if macros.name == "age-days" {
            write!(w, " {:.} ", (Utc::now().timestamp() - 1382071200) / 86400)?;
        }
        Ok(())
    }

    fn paragraph_end(&mut self, w: &mut W) -> Result<()> {
        self.last_char = '。';
        Ok(write!(w, "</p>")?)
    }

    fn code(&mut self, w: &mut W, cont: &str) -> Result<()> {
        let frist = cont.chars().next().unwrap();
        if should_insert_space(self.last_char, frist) {
            write!(w, " ")?;
            self.last_char = '。';
        }
        write!(w, "<code>")?;
        self.text(w, cont)?;
        write!(w, "</code>")?;
        Ok(())
    }

    fn text(&mut self, w: &mut W, cont: &str) -> Result<()> {
        for line in cont.trim().lines() {
            let frist = line.chars().next().unwrap();
            if should_insert_space(self.last_char, frist) {
                write!(w, " ")?;
            }
            self.escape(w, line)?;
            self.last_char = line.chars().last().unwrap();
        }
        Ok(())
    }
}

fn should_insert_space(c1: char, c2: char) -> bool {
    const CHINESE_PUNCTUATION: [char; 14] = [
        '。', '？', '，', '、', '；', '：', '“', '”', '「', '」', '（', '）', '《',
        '》',
    ];

    (c1.is_ascii_graphic() && c2.is_ascii_graphic())
        || (c1.is_ascii_graphic()
            && 0x4E00 < (c2 as u32)
            && (c2 as u32) < 0x9FFF
            && !CHINESE_PUNCTUATION.contains(&c2))
        || (c2.is_ascii_graphic()
            && 0x4E00 < (c1 as u32)
            && (c1 as u32) < 0x9FFF
            && !CHINESE_PUNCTUATION.contains(&c1))
}
