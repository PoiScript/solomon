use std::fs::File;
use std::io::Write;

use crate::{error::Result, Entry};
use chrono::Utc;

use askama::Template;

#[derive(Template)]
#[template(path = "rss.html")]
struct RssTemplate<'a> {
    entries: &'a [Entry<'a>],
    ver: &'static str,
    now: String,
}

pub fn write(entries: &[Entry<'_>]) -> Result<()> {
    let rss = RssTemplate {
        entries,
        ver: env!("CARGO_PKG_VERSION"),
        now: Utc::now().to_rfc2822(),
    };

    let mut file = File::create("assets/atom.xml")?;

    file.write_all(rss.render()?.as_bytes())?;

    Ok(())
}
