use maud::{html, Markup, Render};

use crate::context::OrgMeta;

fn up_next_prev(org: &OrgMeta) -> Markup {
    html! {
        a.link.start data-router href=(org.slug) {
            .icon.left {
                svg fill="currentColor"
                    focusable="false"
                    height="100%"
                    preserveAspectRatio="xMidYMid meet"
                    width="100%"
                    xmlns="http://www.w3.org/2000/svg"
                {
                    path d="M15.4 16.6L10.8 12l4.6-4.6L14 6l-6 6 6 6 1.4-1.4z" {  }
                }
            }
            div {
                .label { "Prev" }
                .title { (org.title) }
            }
        }
    }
}

fn up_next_next(org: &OrgMeta) -> Markup {
    html! {
        a.link.end data-router href=(org.slug) {
            div {
                .label { "Next" }
                .title { (org.title) }
            }
            .icon.right {
                svg fill="currentColor"
                    focusable="false"
                    height="100%"
                    width="100%"
                    preserveAspectRatio="xMidYMid meet"
                    xmlns="http://www.w3.org/2000/svg"
                {
                    path d="M8.6 16.3l4.6-4.6-4.6-4.5L10 5.7l6 6-6 6z" { }
                }
            }
        }
    }
}

pub struct UpNext<'a> {
    pub prev: Option<&'a OrgMeta>,
    pub next: Option<&'a OrgMeta>,
}

impl<'a> Render for UpNext<'a> {
    fn render(&self) -> Markup {
        html! {
            .up-next {
                .nav.start {
                    @if let Some(prev) = self.prev {
                        ( up_next_prev(prev) )
                    }
                }
                .nav.end {
                    @if let Some(next) = self.next {
                        ( up_next_next(next) )
                    }
                }
            }
        }
    }
}
