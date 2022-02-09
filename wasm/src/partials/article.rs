use maud::Render;
use orgize::Org;
use orgize::{
    export::{DefaultHtmlHandler, HtmlEscape, HtmlHandler},
    Element, Event,
};
use std::borrow::Cow;
use std::cmp::min;
use std::io::Write;
use std::ops::Range;

use crate::utils::get_id;
use crate::{context::ImgMeta, Context};

pub enum Mode {
    Html,
    Rss,
    Amp,
}

pub struct Article<'a> {
    pub mode: Mode,
    pub org: &'a Org<'a>,
    pub ctx: &'a Context,
}

impl<'a> Render for Article<'a> {
    fn render_to(&self, buffer: &mut String) {
        let mut title_n = 0;
        let mut handler = DefaultHtmlHandler::default();

        let mut last_char = None;

        for event in self.org.iter() {
            let w = unsafe { buffer.as_mut_vec() };

            match event {
                Event::Start(Element::Link(link)) if link.path.starts_with("file:") => {
                    let key = &link.path[5..];
                    let path = key.trim_start_matches('/');
                    let alt = link.desc.as_ref().unwrap_or_else(|| &Cow::Borrowed(""));
                    let base = &self.ctx.base_url;

                    if let Some(&ImgMeta { height, width, .. }) = self.ctx.img_meta.get(key) {
                        match self.mode {
                            Mode::Html => {
                                let _ = write!(
                                    w,
                                    r#"<div class="img-container"><img loading="lazy" alt="{alt}" width="{width}" height="{height}" src="{base}{path}"/></div>"#,
                                );
                            }
                            Mode::Rss => {
                                let _ = write!(
                                    w,
                                    r#"<img alt="{alt}" width="{width}" height="{height}" src="{base}{path}"/>"#,
                                );
                            }
                            Mode::Amp => {
                                let _ = write!(
                                    w,
                                    r#"<amp-img alt="{alt}" width="{width}" height="{height}" src="{base}{path}" layout="responsive"></amp-img>"#,
                                );
                            }
                        }
                    } else {
                        let _ =
                            write!(w, r#"<img loading="lazy" alt="{alt}" src="{base}{path}"/>"#);
                    }
                }

                Event::Start(Element::Paragraph { .. }) => {
                    last_char = None;
                    let _ = write!(w, "<p>");
                }

                Event::Start(Element::Link(link)) => {
                    let text = link.desc.as_ref().unwrap_or(&link.path);
                    if should_insert_space(last_char, text.chars().next()) {
                        let _ = write!(w, " ");
                    }
                    last_char = None;

                    let _ = write!(w, "<a href=\"{}\">", HtmlEscape(&link.path));

                    for line in text.lines() {
                        let text = line.trim();
                        let first_char = text.chars().next();
                        if should_insert_space(last_char, first_char) {
                            let _ = write!(w, " ");
                        }
                        last_char = text.chars().last();

                        let _ = write!(w, "{}", HtmlEscape(text));
                    }

                    let _ = write!(w, "</a>");
                }

                Event::Start(Element::Text { value }) => {
                    for line in value.lines() {
                        let text = line.trim();
                        let first_char = text.chars().next();
                        if should_insert_space(last_char, first_char) {
                            let _ = write!(w, " ");
                        }
                        last_char = text.chars().last();

                        let _ = write!(w, "{}", HtmlEscape(text));
                    }
                }

                Event::Start(Element::Verbatim { value })
                | Event::Start(Element::Code { value }) => {
                    let text = value.trim();
                    if should_insert_space(last_char, text.chars().next()) {
                        let _ = write!(w, " ");
                    }
                    last_char = text.chars().last();
                    let _ = write!(w, "<code>{}</code>", HtmlEscape(text));
                }

                Event::Start(Element::Document { .. }) => match self.mode {
                    Mode::Amp | Mode::Html => {
                        let _ = write!(w, "<article>");
                    }
                    Mode::Rss => {
                        let _ = write!(w, "<![CDATA[");
                    }
                },

                Event::End(Element::Document { .. }) => match self.mode {
                    Mode::Amp | Mode::Html => {
                        let _ = write!(w, "</article>");
                    }
                    Mode::Rss => {
                        let _ = write!(w, "]]>");
                    }
                },

                Event::Start(Element::Title(title)) => {
                    let level = min(title.level, 6);

                    match self.mode {
                        Mode::Amp | Mode::Html => {
                            title_n = title_n + 1;
                            let id = get_id(title_n, &title.raw);

                            let _ = write!(
                                w,
                                r##"<a class="anchor" href="#{id}"></a><h{level} id="{id}">"##
                            );
                        }
                        Mode::Rss => {
                            let _ = write!(w, r##"<h{level}>"##);
                        }
                    }
                }

                // code highlighting
                Event::Start(Element::InlineSrc(inline_src)) => {
                    let _ = write!(
                        w,
                        r#"<code class="lang-{}">{}</code>"#,
                        &inline_src.lang, &inline_src.body,
                    );
                }
                Event::Start(Element::SourceBlock(block)) => {
                    let _ = write!(
                        w,
                        r#"<pre><code class="lang-{}">{}</code></pre>"#,
                        &block.language, &block.contents
                    );
                }

                Event::Start(element) => {
                    let _ = handler.start(w, element);
                }
                Event::End(element) => {
                    let _ = handler.end(w, element);
                }
            }
        }
    }
}

fn should_insert_space(c1: Option<char>, c2: Option<char>) -> bool {
    const CJK_CHARACTERS: Range<u32> = 0x4E00..0x9FFF;

    const CJK_PUNCTUATIONS: [char; 14] = [
        '。', '？', '，', '、', '；', '：', '“', '”', '「', '」', '（', '）', '《', '》',
    ];

    if let (Some(c1), Some(c2)) = (c1, c2) {
        (c1.is_ascii_graphic() && c2.is_ascii_graphic())
            || (c1.is_ascii_graphic()
                && CJK_CHARACTERS.contains(&(c2 as u32))
                && !CJK_PUNCTUATIONS.contains(&c2))
            || (c2.is_ascii_graphic()
                && CJK_CHARACTERS.contains(&(c1 as u32))
                && !CJK_PUNCTUATIONS.contains(&c1))
    } else {
        false
    }
}
