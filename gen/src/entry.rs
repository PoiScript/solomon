use chrono::{DateTime, NaiveDate, Utc};
use orgize::{Element, Event, Org};

use crate::error::Result;

pub struct Entry<'a> {
    pub title: String,
    pub date: DateTime<Utc>,
    pub slug: String,
    pub tags: Vec<String>,
    pub org: Org<'a>,
}

impl Entry<'_> {
    pub fn from(content: &str) -> Result<Entry<'_>> {
        let org = Org::parse(content);
        let (mut title, mut date, mut slug, mut tags) = (None, None, None, None);

        for event in org.iter() {
            if let Event::Start(Element::Keyword(keyword)) = event {
                match &*keyword.key {
                    "TITLE" => title = Some(keyword.value.to_string()),
                    "DATE" => {
                        date = Some(DateTime::from_utc(
                            NaiveDate::parse_from_str(&keyword.value, "[%Y-%m-%d %a]")?
                                .and_hms(0, 0, 0),
                            Utc,
                        ));
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
            date: date.expect("Missing keyword DATE"),
            title: title.expect("Missing keyword TITLE"),
            slug: slug.expect("Missing keyword SLUG"),
            tags: tags.expect("Missing keyword TAGS"),
            org,
        })
    }
}
