use chrono::Utc;
use maud::{html, PreEscaped};
use std::fs;
use std::io::Write;

use crate::entry::Entry;
use crate::error::Result;
use crate::handlers::SolomonRssHandler;

pub fn write(entries: &[Entry]) -> Result<()> {
    let mut handler = SolomonRssHandler::default();

    let contents = entries
        .iter()
        .map(|entry| {
            let mut vec = Vec::new();

            write!(vec, "<![CDATA[")?;
            entry.org.html_with_handler(&mut vec, &mut handler)?;
            write!(vec, "]]>")?;

            Result::Ok(String::from_utf8(vec)?)
        })
        .collect::<Result<Vec<_>>>()?;

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
                @for (entry, content) in entries.iter().zip(contents) {
                    item {
                        title { (&entry.title) }
                        author { "PoiScript" }
                        link { "https://blog.poi.cat/post/"(entry.slug) }
                        guid isPermaLink="false" { (entry.slug) }
                        @for tag in &entry.tags {
                            category { (tag) }
                        }
                        pubDate { (entry.date.to_rfc2822()) }
                        description { (PreEscaped(content)) }
                    }
                }
            }
        }
    };

    fs::write("assets/atom.xml", markup.into_string())?;

    Ok(())
}
