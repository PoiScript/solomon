use crate::Entry;
use json::{object, JsonValue};
use std::{fs::File, io::Result};

pub fn write_summary(entries: &[Entry<'_>]) -> Result<()> {
    let file = &mut File::create("assets/posts.json")?;
    JsonValue::Array(
        entries
            .iter()
            .map(|entry| {
                object! {
                    "date" => entry.date.format("%F").to_string(),
                    "slug" => entry.slug,
                    "title" => entry.title,
                    "summary" => entry.summary,
                    "tags" => entry
                        .tags
                        .iter()
                        .map(|&t| String::from(t))
                        .collect::<Vec<_>>(),
                }
            })
            .collect::<Vec<_>>(),
    )
    .write(file)
}

pub fn write_detail(entries: &[Entry<'_>]) -> Result<()> {
    for entry in entries {
        let file = &mut File::create(format!("assets/post/{}.json", entry.slug))?;
        let obj = object! {
            "html" => entry.html.as_str(),
            "prior" => entry.prior.map(|e| {
                object! {
                    "title" => e.0,
                    "slug" => e.1,
                }
            }),
            "next" => entry.next.map(|e| {
                object! {
                    "title" => e.0,
                    "slug" => e.1,
                }
            }),
        };
        obj.write(file)?;
    }

    Ok(())
}
