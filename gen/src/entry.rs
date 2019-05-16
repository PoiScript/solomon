use crate::{error::Result, render::render};
use chrono::{Datelike, NaiveDate};
use orgize::elements::{Key, Keyword};
use orgize::{Event, Parser};
use serde::Serialize;
use std::mem::replace;

#[derive(Serialize)]
pub struct EntryInfo<'a> {
    pub title: &'a str,
    pub slug: &'a str,
    pub tags: Vec<&'a str>,
    pub date: NaiveDate,
}

#[derive(Serialize)]
pub struct Entry<'a> {
    pub title: &'a str,
    pub date: NaiveDate,
    pub slug: &'a str,
    pub tags: Vec<&'a str>,
    pub prior: Option<EntryInfo<'a>>,
    pub next: Option<EntryInfo<'a>>,
    pub html: String,
}

impl<'a> Entry<'a> {
    pub fn from(content: &'a str) -> Result<Entry<'a>> {
        let (mut title, mut date, mut slug, mut tags) = (None, None, None, None);

        for event in Parser::new(&content) {
            if let Event::Keyword(Keyword { key, value }) = event {
                match key {
                    Key::Title => title = Some(value),
                    Key::Date => {
                        date = Some(NaiveDate::parse_from_str(
                            &value[1..value.len() - 1],
                            "%Y-%m-%d %a",
                        )?);
                    }
                    Key::Custom("TAGS") => tags = Some(value.split_whitespace().collect()),
                    Key::Custom("SLUG") => slug = Some(value),
                    _ => (),
                }
            }
        }

        Ok(Entry {
            date: date.expect("Missing keyword DATE"),
            title: title.expect("Missing keyword TITLE"),
            slug: slug.expect("Missing keyword SLUG"),
            tags: tags.expect("Missing keyword TAGS"),
            html: render(&content)?,
            prior: None,
            next: None,
        })
    }

    pub fn info(&self) -> EntryInfo<'a> {
        EntryInfo {
            date: self.date,
            title: self.title,
            slug: self.slug,
            tags: self.tags.clone(),
        }
    }
}

#[derive(Serialize)]
pub struct EntriesGroupByYear<'a> {
    year: i32,
    entries: Vec<EntryInfo<'a>>,
}

pub fn group_by_year<'a>(entries: &'a [Entry]) -> Vec<EntriesGroupByYear<'a>> {
    let mut res = Vec::new();
    let mut group = EntriesGroupByYear {
        year: entries[0].date.year(),
        entries: vec![Entry::info(&entries[0])],
    };

    for entries in entries.windows(2) {
        if entries[0].date.year() == entries[1].date.year() {
            group.entries.push(Entry::info(&entries[1]));
        } else {
            res.push(replace(
                &mut group,
                EntriesGroupByYear {
                    year: entries[1].date.year(),
                    entries: vec![Entry::info(&entries[1])],
                },
            ));
        }
    }

    res.push(group);

    res
}
