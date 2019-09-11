use json::{object, JsonValue};
use std::fs;

use crate::entry::Entry;
use crate::error::Result;
use crate::handlers::SolomonHtmlHandler;

pub fn write_json(entries: &[Entry]) -> Result<()> {
    if entries.len() == 1 {
        let mut vec = Vec::new();
        entries[0]
            .org
            .html_with_handler(&mut vec, SolomonHtmlHandler::default())?;
        let html = String::from_utf8(vec)?;

        let obj = object! {
            "title" => &*entries[0].title,
            "slug" => &*entries[0].slug,
            "tags" => &*entries[0].tags,
            "date" => entries[0].date.to_rfc3339(),
            "html" => html,
        };

        fs::write(
            format!("assets/post/{}.json", entries[0].slug),
            obj.to_string(),
        )?;
    } else if entries.len() >= 2 {
        let mut vec = Vec::new();
        entries[0]
            .org
            .html_with_handler(&mut vec, SolomonHtmlHandler::default())?;
        let html = String::from_utf8(vec)?;

        let obj = object! {
            "title" => &*entries[0].title,
            "slug" => &*entries[0].slug,
            "tags" => &*entries[0].tags,
            "date" => entries[0].date.to_rfc3339(),
            "html" => html,
            "next" => object! {
                "title" => &*entries[1].title,
                "slug" => &*entries[1].slug,
            }
        };

        fs::write(
            format!("assets/post/{}.json", entries[0].slug),
            obj.to_string(),
        )?;

        for windows in entries.windows(3) {
            let mut vec = Vec::new();
            windows[1]
                .org
                .html_with_handler(&mut vec, SolomonHtmlHandler::default())?;
            let html = String::from_utf8(vec)?;

            let obj = object! {
                "title" => &*windows[1].title,
                "slug" => &*windows[1].slug,
                "tags" => &*windows[1].tags,
                "date" => windows[1].date.to_rfc3339(),
                "html" => html,
                "next" => object! {
                    "title" => &*windows[0].title,
                    "slug" => &*windows[0].slug,
                },
                "prev" => object! {
                    "title" => &*windows[2].title,
                    "slug" => &*windows[2].slug,
                }
            };

            fs::write(
                format!("assets/post/{}.json", windows[1].slug),
                obj.to_string(),
            )?;
        }

        let len = entries.len();
        let mut vec = Vec::new();
        entries[len - 1]
            .org
            .html_with_handler(&mut vec, SolomonHtmlHandler::default())?;
        let html = String::from_utf8(vec)?;

        let obj = object! {
            "title" => &*entries[len - 1].title,
            "slug" => &*entries[len - 1].slug,
            "tags" => &*entries[len - 1].tags,
            "date" => entries[len - 1].date.to_rfc3339(),
            "html" => html,
            "prev" => object! {
                "title" => &*entries[len - 2].title,
                "slug" => &*entries[len - 2].slug,
            }
        };

        fs::write(
            format!("assets/post/{}.json", entries[len - 1].slug),
            obj.to_string(),
        )?;
    }

    Ok(())
}

pub fn write_posts_json(entries: &[Entry]) -> Result<()> {
    let entries = entries
        .iter()
        .map(|entry| {
            object! {
                "title" => &*entry.title,
                "slug" => &*entry.slug,
                "tags" => &*entry.tags,
                "date" => entry.date.to_rfc3339(),
            }
        })
        .collect::<Vec<_>>();

    let arr = JsonValue::Array(entries);

    fs::write("assets/posts.json", arr.to_string())?;

    Ok(())
}
