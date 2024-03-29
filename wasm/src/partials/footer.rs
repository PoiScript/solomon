use maud::{html, Markup, Render};

pub struct Footer;

impl Render for Footer {
    fn render(&self) -> Markup {
        html! {
            footer.footer.toolbar {
                .wrapper {
                    div.links {
                        a.link href="/rss" { "RSS" }
                        span.separator aria-hidden="true" { "/" }
                        a.link href="https://github.com/PoiScript/solomon" { "GitHub" }
                    }
                    span.spacer { }
                    span.license { "CC-BY-SA-4.0" }
               }
           }
        }
    }
}
