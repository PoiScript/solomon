use std::fs::File;
use std::io::Result;

use json::{object, JsonValue};

use crate::Entry;

pub fn write_summary(entries: &[Entry<'_>]) -> Result<()> {
    let file = &mut File::create("assets/posts.json")?;
    JsonValue::Array(
        entries
            .iter()
            .map(|entry| object! {
                "date" => entry.date.format("%F").to_string(),
                "slug" => entry.slug,
                "title" => entry.title,
                "summary" => entry.summary,
                "tags" => entry.tags.split_whitespace().map(|t| t.into()).collect::<Vec<JsonValue>>(),
            })
            .collect::<Vec<_>>(),
    )
    .write(file)
}

pub fn write_detail(entries: &[Entry<'_>]) -> Result<()> {
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
        let file = &mut File::create(format!("assets/post/{}.json", curr.slug))?;
        let obj = object! {
            "html" => curr.html.as_str(),
            "prior_title" => prior.map(|p| p.title),
            "prior_slug" => prior.map(|p| p.slug),
            "next_title" => next.map(|p| p.title),
            "next_slug" => next.map(|p| p.slug),
        };
        obj.write(file)?;
    }

    Ok(())
}
