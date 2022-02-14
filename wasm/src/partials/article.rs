use maud::html;
use maud::Render;
use orgize::Org;
use orgize::{
    export::{DefaultHtmlHandler, HtmlEscape, HtmlHandler},
    Element, Event,
};
use std::borrow::Cow;
use std::cmp::min;
use std::fmt::Write;
use std::ops::Range;

use crate::utils::get_id;
use crate::Context;

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
            match event {
                Event::Start(Element::Link(link)) if link.path.starts_with("file:") => {
                    let key = &link.path[5..];

                    let (height, width, style) = self
                        .ctx
                        .img_meta
                        .get(key)
                        .map(|meta| {
                            (
                                Some(meta.height),
                                Some(meta.height),
                                Some(html! { "max-width:"(meta.width)"px;max-height:"(meta.height)"px;" }),
                            )
                        })
                        .unwrap_or_default();

                    let path = key.trim_start_matches('/');
                    let alt = link.desc.as_ref().unwrap_or(&Cow::Borrowed(""));

                    html! {
                        figure {
                            @match self.mode {
                                Mode::Html => {
                                    img style=[style]
                                        loading="lazy"
                                        src={ (self.ctx.base_url)(path) }
                                        width=[width]
                                        height=[height]
                                        alt=(alt);
                                },
                                Mode::Rss => {
                                    img loading="lazy"
                                        src={ (self.ctx.base_url)(path) }
                                        width=[width]
                                        height=[height]
                                        alt=(alt);
                                },
                                Mode::Amp => {
                                    amp-img style=[style]
                                        loading="lazy"
                                        src={ (self.ctx.base_url)(path) }
                                        width=[width]
                                        height=[height]
                                        alt=(alt);
                                }
                            }
                            figcaption {(alt)}
                        }
                    }
                    .render_to(buffer)
                }

                Event::Start(Element::Paragraph { .. }) => {
                    last_char = None;
                    let _ = write!(buffer, "<p>");
                }

                Event::Start(Element::Link(link)) => {
                    let text = link.desc.as_ref().unwrap_or(&link.path);
                    if should_insert_space(last_char, text.chars().next()) {
                        let _ = write!(buffer, " ");
                    }
                    last_char = None;

                    let _ = write!(buffer, "<a href=\"{}\">", HtmlEscape(&link.path));

                    for line in text.lines() {
                        let text = line.trim();
                        let first_char = text.chars().next();
                        if should_insert_space(last_char, first_char) {
                            let _ = write!(buffer, " ");
                        }
                        last_char = text.chars().last();

                        let _ = write!(buffer, "{}", HtmlEscape(text));
                    }

                    let _ = write!(buffer, "</a>");
                }

                Event::Start(Element::Text { value }) => {
                    for line in value.lines() {
                        let text = line.trim();
                        let first_char = text.chars().next();
                        if should_insert_space(last_char, first_char) {
                            let _ = write!(buffer, " ");
                        }
                        last_char = text.chars().last();

                        let _ = write!(buffer, "{}", HtmlEscape(text));
                    }
                }

                Event::Start(Element::Verbatim { value })
                | Event::Start(Element::Code { value }) => {
                    let text = value.trim();
                    if should_insert_space(last_char, text.chars().next()) {
                        let _ = write!(buffer, " ");
                    }
                    last_char = text.chars().last();
                    let _ = write!(buffer, "<code>{}</code>", HtmlEscape(text));
                }

                Event::Start(Element::Document { .. }) => match self.mode {
                    Mode::Amp | Mode::Html => {
                        let _ = write!(buffer, "<article>");
                    }
                    Mode::Rss => {
                        let _ = write!(buffer, "<![CDATA[");
                    }
                },

                Event::End(Element::Document { .. }) => match self.mode {
                    Mode::Amp | Mode::Html => {
                        let _ = write!(buffer, "</article>");
                    }
                    Mode::Rss => {
                        let _ = write!(buffer, "]]>");
                    }
                },

                Event::Start(Element::Title(title)) => {
                    let level = min(title.level, 6);

                    match self.mode {
                        Mode::Amp | Mode::Html => {
                            title_n += 1;
                            let id = get_id(title_n, &title.raw);

                            let _ = write!(
                                buffer,
                                r##"<a class="anchor" href="#{id}"></a><h{level} id="{id}">"##
                            );
                        }
                        Mode::Rss => {
                            let _ = write!(buffer, r##"<h{level}>"##);
                        }
                    }
                }

                // code highlighting
                Event::Start(Element::InlineSrc(inline_src)) => html! {
                    code class={ "lang-"(inline_src.lang) } { (inline_src.body) }
                }
                .render_to(buffer),

                Event::Start(Element::SourceBlock(block)) => html! {
                    pre {
                        code class={ "lang-"(block.language) } { (block.contents) }
                    }
                }
                .render_to(buffer),

                Event::Start(element) => {
                    let _ = handler.start(unsafe { buffer.as_mut_vec() }, element);
                }
                Event::End(element) => {
                    let _ = handler.end(unsafe { buffer.as_mut_vec() }, element);
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
