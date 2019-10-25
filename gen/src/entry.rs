use chrono::{DateTime, NaiveDate, Utc};
use orgize::{Element, Event, Org};

use crate::error::Result;

pub struct Entry<'a> {
    pub title: String,
    pub published: DateTime<Utc>,
    pub updated: Option<DateTime<Utc>>,
    pub slug: String,
    pub tags: Vec<String>,
    pub org: Org<'a>,
}

fn parse_timestamp(value: &str) -> Result<DateTime<Utc>> {
    let navie = NaiveDate::parse_from_str(value, "[%Y-%m-%d %a]")?.and_hms(0, 0, 0);
    Ok(DateTime::from_utc(navie, Utc))
}

impl Entry<'_> {
    pub fn from(content: &str) -> Result<Entry> {
        let org = Org::parse(content);
        let (mut title, mut published, mut updated, mut slug, mut tags) =
            (None, None, None, None, None);

        for event in org.iter() {
            if let Event::Start(Element::Keyword(keyword)) = event {
                match &*keyword.key {
                    "TITLE" => title = Some(keyword.value.to_string()),
                    "PUBLISHED" => {
                        published = Some(parse_timestamp(&keyword.value)?);
                    }
                    "UPDATED" => {
                        updated = Some(parse_timestamp(&keyword.value)?);
                    }
                    "TAGS" => {
                        tags = Some(
                            keyword
                                .value
                                .split_whitespace()
                                .map(|s| s.to_string())
                                .collect(),
                        )
                    }
                    "SLUG" => slug = Some(keyword.value.to_string()),
                    _ => (),
                }
            }
        }

        Ok(Entry {
            published: published.expect("Missing keyword PUBLISHED"),
            updated,
            title: title.expect("Missing keyword TITLE"),
            slug: slug.expect("Missing keyword SLUG"),
            tags: tags.expect("Missing keyword TAGS"),
            org,
        })
    }
}
