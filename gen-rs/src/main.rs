use std::fs::{read_dir, File};
use std::io::{Cursor, Read};
use std::path::PathBuf;

use chrono::NaiveDate;
use orgize::elements::Key;
use orgize::tools::metadata;

use error::{Error, Result};

mod error;
mod html;
mod json;
mod rss;

pub struct Entry<'a> {
    title: &'a str,
    date: NaiveDate,
    slug: &'a str,
    tags: &'a str,
    content: String,
}

fn walk_dirs(dir: &PathBuf, files: &mut Vec<(PathBuf, String)>) -> Result<()> {
    for entry in read_dir(dir)? {
        let path = entry?.path();
        if path.is_dir() {
            walk_dirs(&path, files)?;
        }

        if let Some(ext) = path.extension() {
            if ext == "org" {
                let mut content = String::new();
                File::open(&path)?.read_to_string(&mut content)?;
                files.push((path, content));
            }
        }
    }

    Ok(())
}

fn main() -> Result<()> {
    let mut files = Vec::new();
    walk_dirs(&PathBuf::from(r"content/post"), &mut files)?;

    let mut entries = Vec::new();
    for (path, content) in &files {
        let (_toc, keywords, _) = metadata(&content);

        let (mut title, mut date, mut slug, mut tags) = (None, None, None, None);

        for (key, value) in keywords {
            match key {
                Key::Title => title = Some(value),
                Key::Date => {
                    let value = value.trim();
                    date = Some(NaiveDate::parse_from_str(
                        &value[1..value.len() - 1],
                        "%Y-%m-%d %a",
                    )?);
                }
                Key::Custom(key) if key == "TAGS" => tags = Some(value),
                Key::Custom(key) if key == "SLUG" => slug = Some(value),
                _ => (),
            }
        }

        entries.push(Entry {
            content: String::from_utf8(
                html::render(&content, Cursor::new(Vec::new()))?.into_inner(),
            )?,
            date: date.ok_or_else(|| Error::MissingDate(path.clone()))?,
            title: title.ok_or_else(|| Error::MissingTitle(path.clone()))?,
            slug: slug.ok_or_else(|| Error::MissingSlug(path.clone()))?,
            tags: tags.ok_or_else(|| Error::MissingTags(path.clone()))?,
        });
    }

    entries.sort_by(|a, b| b.date.cmp(&a.date));

    json::write_summary(&mut entries)?;

    json::write_detail(&mut entries)?;

    rss::write(&mut File::create("assets/atom.xml")?, entries)?;

    // TODO: amp

    Ok(())
}
