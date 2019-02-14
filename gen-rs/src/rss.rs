use std::io::{Result, Write};

use chrono::Utc;
use rss::{CategoryBuilder, ChannelBuilder, ItemBuilder};

use crate::Entry;

#[inline]
pub fn write<W: Write>(w: &mut W, entries: Vec<Entry<'_>>) -> Result<()> {
    let mut items = Vec::new();
    for entry in entries {
        items.push(
            ItemBuilder::default()
                .title(Some(String::from(entry.title)))
                .author(Some("PoiScript".to_owned()))
                .categories(
                    entry
                        .tags
                        .split_whitespace()
                        .map(|tag| CategoryBuilder::default().name(tag).build().unwrap())
                        .collect::<Vec<_>>(),
                )
                .description(Some(entry.content))
                .build()
                .unwrap(),
        )
    }

    ChannelBuilder::default()
        .title("solomon")
        .link("https://blog.poi.cat")
        .description("PoiScript's Blog")
        .language(Some("zh-Hans".to_owned()))
        .pub_date(Some(Utc::now().to_rfc2822()))
        .items(items)
        .build()
        .unwrap()
        .write_to(w)
        .unwrap();

    Ok(())
}
