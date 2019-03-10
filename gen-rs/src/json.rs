use std::fs::File;
use std::io::Cursor;

use chrono::NaiveDate;
use serde::Serialize;
use serde_json::to_writer;

use crate::error::Result;
use crate::{render, Entry};

pub fn write_summary(entries: &mut Vec<Entry<'_>>) -> Result<()> {
    #[derive(Serialize)]
    struct Post<'a> {
        date: NaiveDate,
        slug: &'a str,
        tags: Vec<&'a str>,
        title: &'a str,
    }

    to_writer(
        File::create("assets/posts.json")?,
        &entries
            .iter()
            .map(|entry| Post {
                date: entry.date,
                slug: entry.slug,
                tags: entry.tags.split_whitespace().collect(),
                title: entry.title,
            })
            .collect::<Vec<_>>(),
    )?;

    Ok(())
}

fn render_to_string(entry: &Entry) -> Result<String> {
    let mut cursor = Cursor::new(Vec::new());
    render::html(entry, &mut cursor)?;
    Ok(String::from_utf8(cursor.into_inner())?)
}

pub fn write_detail(entries: &mut Vec<Entry<'_>>) -> Result<()> {
    #[derive(Serialize)]
    struct Post<'a> {
        html: &'a str,
        prior_title: Option<&'a str>,
        prior_slug: Option<&'a str>,
        next_title: Option<&'a str>,
        next_slug: Option<&'a str>,
    }

    to_writer(
        File::create(format!("assets/json/{}.json", entries[0].slug))?,
        &Post {
            html: render_to_string(&entries[0])?,
            prior_title: None,
            prior_slug: None,
            next_title: Some(&entries[1].title),
            next_slug: Some(&entries[1].slug),
        },
    )?;

    if entries.len() > 2 {
        for posts in entries.windows(3) {
            to_writer(
                File::create(format!("assets/json/{}.json", posts[1].slug))?,
                &Post {
                    html: render_to_string(&posts[0])?,
                    prior_title: Some(&posts[0].title),
                    prior_slug: Some(&posts[0].slug),
                    next_title: Some(&posts[2].title),
                    next_slug: Some(&posts[2].slug),
                },
            )?;
        }
    }

    to_writer(
        File::create(format!(
            "assets/json/{}.json",
            entries[entries.len() - 1].slug
        ))?,
        &Post {
            html: render_to_string(&entries[entries.len() - 1])?,
            prior_title: Some(&entries[entries.len() - 2].title),
            prior_slug: Some(&entries[entries.len() - 2].slug),
            next_title: None,
            next_slug: None,
        },
    )?;

    Ok(())
}
