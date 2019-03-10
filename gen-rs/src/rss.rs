use std::fs::File;
use std::io::{Result, Write};

use chrono::Utc;

use crate::Entry;

pub fn write(entries: &[Entry<'_>]) -> Result<()> {
    let w = &mut File::create("assets/atom.xml")?;

    write!(
        w,
        "<rss xmlns:dc=\"http://purl.org/dc/elements/1.1/\" \
         xmlns:content=\"http://purl.org/rss/1.0/modules/content/\" \
         xmlns:atom=\"http://www.w3.org/2005/Atom\" version=\"2.0\">"
    )?;
    write!(w, "<channel>")?;
    write!(w, "<title>solomon</title>")?;
    write!(w, "<description>PoiScript's Blog</description>")?;
    write!(w, "<link>https://blog.poi.cat</link>")?;
    write!(
        w,
        "<generator>solomon {}</generator>",
        env!("CARGO_PKG_VERSION")
    )?;
    write!(
        w,
        "<lastBuildDate>{}</lastBuildDate>",
        Utc::now().to_rfc2822()
    )?;
    write!(w, r#"<atom:link href="https://blog.poi.cat/atom.xml" rel="self" type="application/rss+xml"/>"#)?;
    write!(w, "<language>zh-Hans</language>")?;
    write!(
        w,
        "<copyright>Content licensed under CC-BY-SA-4.0.</copyright>"
    )?;

    for e in entries {
        write!(w, "<item>")?;
        write!(w, "<title><![CDATA[{}]]></title>", e.title)?;
        write!(w, "<link>https://blog.poi.cat/post/{}</link>", e.slug)?;
        write!(w, r#"<guid isPermaLink="false">{}</guid>"#, e.slug)?;
        for t in e.tags.split_whitespace() {
            write!(w, "<category><![CDATA[{}]]></category>", t)?;
        }
        write!(w, "<author>PoiScript</author>")?;
        write!(
            w,
            "<pubDate>{} 00:00:00 +0000</pubDate>",
            e.date.format("%a, %e %b %Y")
        )?;
        write!(w, "<description><![CDATA[{}]]></description>", e.html)?;
        write!(w, "</item>")?;
    }

    write!(w, "</channel></rss>")
}
