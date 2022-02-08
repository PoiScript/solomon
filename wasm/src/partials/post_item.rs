use maud::{html, Markup, Render};

use crate::context::OrgMeta;

pub struct PostItem<'a> {
    pub meta: &'a OrgMeta,
}

impl<'a> Render for PostItem<'a> {
    fn render(&self) -> Markup {
        html! {
            ."post-item" {
                a.title data-router href=(self.meta.slug) { (self.meta.title) }
                .subtitle {
                    (self.meta.published.format("%F"))
                    " ·"

                    @for tag in &self.meta.tags {
                        " "
                        a.tag data-router href={ "/tag/"(tag) } {
                            "#" (tag)
                        }
                    }
                }
            }
        }
    }
}
