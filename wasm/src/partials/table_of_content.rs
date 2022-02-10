use maud::Render;
use orgize::{
    export::{DefaultHtmlHandler, HtmlHandler},
    Element, Event, Org,
};
use std::cmp::min;
use std::io::Write;

use crate::utils::get_id;

pub struct TableOfContent<'a> {
    pub org: &'a Org<'a>,
}

impl<'a> Render for TableOfContent<'a> {
    fn render_to(&self, buffer: &mut String) {
        let mut handler = DefaultHtmlHandler::default();
        let mut in_title = false;
        let mut title_n = 0;

        for event in self.org.iter() {
            let w = unsafe { buffer.as_mut_vec() };

            match event {
                Event::Start(Element::Title(title)) => {
                    if title_n == 0 {
                        let _ = write!(
                            w,
                            r#"<div class="toc"><div class="heading">Table of content</div>"#
                        );
                    }

                    title_n += 1;
                    in_title = true;

                    let id = get_id(title_n, &title.raw);
                    let level = min(title.level, 6);

                    let _ = write!(w, r##"<div class="level-{level}"><a href="#{id}">"##,);
                }
                Event::End(Element::Title(_)) => {
                    in_title = false;

                    let _ = write!(w, r#"</a></div>"#);
                }

                Event::Start(element) => {
                    if in_title {
                        let _ = handler.start(w, element);
                    }
                }
                Event::End(element) => {
                    if in_title {
                        let _ = handler.end(w, element);
                    }
                }
            }
        }

        if title_n > 0 {
            buffer.push_str(r#"</div>"#);
        }
    }
}
