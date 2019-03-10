use std::fs::File;
use std::io::Cursor;

use json::{object, JsonValue};

use crate::error::Result;
use crate::{render, Entry};

pub fn write_summary(entries: &mut Vec<Entry<'_>>) -> Result<()> {
    JsonValue::Array(
        entries
            .iter()
            .map(|entry| object! {
                "date" => entry.date.format("%F").to_string(),
                "slug" => entry.slug,
                "title" => entry.title,
                "tags" => entry.tags.split_whitespace().map(|t| t.into()).collect::<Vec<JsonValue>>(),
            })
            .collect::<Vec<_>>(),
    )
    .write(&mut File::create("assets/posts.json")?)?;

    Ok(())
}

pub fn write_detail(entries: &mut Vec<Entry<'_>>) -> Result<()> {
    use std::iter::once;

    let len = entries.len();
    let iter = once((None, &entries[0], Some(&entries[1])))
        .chain(
            entries
                .windows(3)
                .map(|e| (Some(&e[0]), &e[1], Some(&e[2]))),
        )
        .chain(once((Some(&entries[len - 2]), &entries[len - 1], None)));

    for (prior, curr, next) in iter {
        let mut cursor = Cursor::new(Vec::new());
        render::html(curr, &mut cursor)?;
        let obj = object! {
            "html" => String::from_utf8(cursor.into_inner())?,
            "prior_title" => prior.map(|p| p.title),
            "prior_slug" => prior.map(|p| p.slug),
            "next_title" => next.map(|p| p.title),
            "next_slug" => next.map(|p| p.slug),
        };
        obj.write(&mut File::create(format!(
            "assets/json/{}.json",
            curr.slug
        ))?)?;
    }

    Ok(())
}
