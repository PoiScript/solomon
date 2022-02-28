use maud::{html, Markup, Render};
use orgize::{Element, Event, Org};

pub struct OgDescription<'a> {
    pub org: &'a Org<'a>,
}

impl<'a> Render for OgDescription<'a> {
    fn render(&self) -> Markup {
        let mut description = String::with_capacity(200);

        for event in self.org.iter() {
            if description.len() >= 200 {
                break;
            }

            match event {
                Event::Start(Element::Text { value })
                | Event::Start(Element::Code { value })
                | Event::Start(Element::Verbatim { value }) => {
                    for line in value.lines() {
                        let text = line.trim();
                        description += text;
                    }
                }

                Event::Start(Element::Link(link)) => {
                    description += link.desc.as_ref().unwrap_or(&link.path)
                }

                Event::End(Element::Paragraph { .. }) | Event::End(Element::Title(_)) => {
                    description += " ";
                }

                _ => {}
            }
        }

        html! {
            @if !description.is_empty() {
                meta property="og:description" content={(description)};
            }
        }
    }
}
