use chrono::Utc;
use maud::{html, PreEscaped};
use std::{fs, io::Write};

use crate::entry::Entry;
use crate::error::Result;
use crate::handlers::SolomonRssHandler;

pub fn write(entries: &[Entry]) -> Result<()> {
    let mut handler = SolomonRssHandler::default();

    let markup = html! {
        rss version="2.0"
            xmlns:atom="http://www.w3.org/2005/Atom"
            xmlns:content="http://purl.org/rss/1.0/modules/content/"
            xmlns:dc="http://purl.org/dc/elements/1.1/"
        {
            channel {
                title { "solomon" }
                description { "PoiScript's Blog" }
                link rel="self" href="https://blog.poi.cat/atom.xml" {}
                link rel="alternate" href="https://blog.poi.cat" {}
                generator { "solomon "(env!("CARGO_PKG_VERSION")) }
                lastBuildDate { (Utc::now().to_rfc2822()) }
                language { "zh-Hans" }
                copyright { "Content licensed under CC-BY-SA-4.0." }
                @for entry in entries {
                    item {
                        title { (&entry.title) }
                        author { "PoiScript" }
                        link { "https://blog.poi.cat/post/"(entry.slug) }
                        guid isPermaLink="false" { (entry.slug) }
                        @for tag in &entry.tags {
                            category { (tag) }
                        }
                        pubDate { (entry.published.to_rfc2822()) }
                        description {
                            ({
                                let mut content = Vec::new();
                                write!(content, "<![CDATA[")?;
                                entry.org.write_html_custom(&mut content, &mut handler)?;
                                write!(content, "]]>")?;
                                PreEscaped(String::from_utf8(content)?)
                            })
                        }
                    }
                }
            }
        }
    };

    fs::write("assets/atom.xml", markup.into_string())?;

    Ok(())
}
