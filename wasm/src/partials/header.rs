use maud::{html, Markup, Render};

pub struct Header;

impl Render for Header {
    fn render(&self) -> Markup {
        html! {
            header.header.toolbar {
                .wrapper {
                    a.homepage.link data-router href="/" {
                        span.logo aria-hidden="true" {
                            svg xmlns="http://www.w3.org/2000/svg"
                                width="100%" height="100%"
                            {
                                g fill="none" stroke="currentColor" stroke-width="1.6" {
                                    path d="M11.6 17.2H4L14.4 1.6l-10 6 7.2 9.6z" { }
                                    path d="M12.4 6.8H20L9.6 22.4l10-6-7.2-9.6z" { }
                                }
                            }
                        }
                        span { "Solomon" }
                    }
                    span.spacer { }
                    a.link data-router href="/about" { "About" }
                    span.separator { "/" }
                    a.link data-router href="/link" { "Link" }
                }
            }
        }
    }
}
