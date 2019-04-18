use crate::{error::Result, Entry};
use chrono::Utc;
use maud::{html, Render};
use std::{fs::File, io::Write};

struct CData<T: AsRef<str>>(T);

impl<T: AsRef<str>> Render for CData<T> {
    fn render_to(&self, w: &mut String) {
        w.push_str("<![CDATA[");
        w.push_str(self.0.as_ref());
        w.push_str("]]>");
    }
}

pub fn write(entries: &[Entry<'_>]) -> Result<()> {
    let markup = html! {
        rss xmlns:dc="http://purl.org/dc/elements/1.1/"
            xmlns:content="http://purl.org/rss/1.0/modules/content/"
            xmlns:atom="http://www.w3.org/2005/Atom" version="2.0"
        {
            channel {
                title { "solomon" }
                description { "PoiScript's Blog" }
                link { "https://blog.poi.cat" }
                generator { "solomon " (env!("CARGO_PKG_VERSION")) }
                lastBuildDate { (Utc::now().to_rfc2822()) }
                language { "zh-Hans" }
                copyright { "Content licensed under CC-BY-SA-4.0." }
                atom:link href="https://blog.poi.cat/atom.xml" rel="self" type="application/rss+xml";
                @for entry in entries {
                    item {
                        title { (CData(entry.title)) }
                        link { "https://blog.poi.cat/post/" (entry.slug) }
                        guid isPermaLink="false" { (entry.slug) }
                        @for tag in &entry.tags {
                            category { (CData(tag)) }
                        }
                        author { "PoiScript" }
                        pubDate { (entry.date.format("%a, %e %b %Y")) " 00:00:00 +0000" }
                        description  { (CData(&entry.html)) }
                    }
                }
            }
        }
    };

    Ok(File::create("assets/atom.xml")?.write_all(markup.into_string().as_bytes())?)
}
