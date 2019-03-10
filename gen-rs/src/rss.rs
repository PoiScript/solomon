use std::io::Write;

use chrono::Utc;

use crate::{Entry, render};
use crate::error::Result;

pub fn write<W: Write>(w: &mut W, entries: &Vec<Entry<'_>>) -> Result<()> {
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
        render::rss(e, w)?;
    }

    write!(w, "</channel></rss>")?;

    Ok(())
}
