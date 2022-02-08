use maud::{html, Markup, PreEscaped, Render};

pub struct Heading<'a> {
    pub title: &'a str,
    pub subtitle: Option<&'a str>,
}

impl<'a> Render for Heading<'a> {
    fn render(&self) -> Markup {
        html! {
            div."title-section" {
                h1.title { (self.title) }

                @if let Some(subtitle) = self.subtitle {
                    h2.subtitle { (PreEscaped(subtitle)) }
                }
            }
        }
    }
}
