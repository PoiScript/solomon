use chrono::NaiveDate;
use serde::Serialize;
use serde_json::to_writer;
use std::fs::File;
use std::io::Result;

use crate::Entry;

pub fn write_summary(entries: &mut Vec<Entry<'_>>) -> Result<()> {
    #[derive(Serialize)]
    struct Post<'a> {
        title: &'a str,
        date: NaiveDate,
        slug: &'a str,
        tags: &'a str,
    }

    to_writer(
        File::create("assets/posts.json")?,
        &entries
            .iter()
            .map(|entry| Post {
                title: entry.title,
                date: entry.date,
                slug: entry.slug,
                tags: entry.tags,
            })
            .collect::<Vec<_>>(),
    )?;

    Ok(())
}

pub fn write_detail(entries: &mut Vec<Entry<'_>>) -> Result<()> {
    #[derive(Serialize)]
    struct Post<'a> {
        html: &'a str,
    }

    for post in entries {
        to_writer(
            File::create(format!("assets/post/{}.json", post.slug))?,
            &Post {
                html: &post.content,
            },
        )?;
    }

    Ok(())
}
