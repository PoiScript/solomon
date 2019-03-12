mod amp;
mod error;
mod json;
mod render;
mod rss;

use std::fs::{read_dir, File};
use std::io::Read;
use std::path::PathBuf;

use chrono::NaiveDate;
use orgize::elements::Key;
use orgize::tools::metadata;

use error::{Error, Result};
use render::render;

pub struct Entry<'a> {
    title: &'a str,
    date: NaiveDate,
    slug: &'a str,
    tags: Vec<&'a str>,
    amp: String,
    html: String,
    summary: &'a str,
    prior: Option<(&'a str, &'a str)>,
    next: Option<(&'a str, &'a str)>,
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

        let (mut title, mut date, mut slug, mut tags, mut summary) = (None, None, None, None, None);

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
                Key::Custom(key) if key == "TAGS" => {
                    tags = Some(value.split_ascii_whitespace().collect::<Vec<_>>())
                }
                Key::Custom(key) if key == "SLUG" => slug = Some(value),
                Key::Custom(key) if key == "SUMMARY" => summary = Some(value),
                _ => (),
            }
        }

        entries.push(Entry {
            amp: render(&content, true)?,
            html: render(&content, false)?,
            date: date.ok_or_else(|| Error::MissingDate(path.clone()))?,
            title: title.ok_or_else(|| Error::MissingTitle(path.clone()))?,
            slug: slug.ok_or_else(|| Error::MissingSlug(path.clone()))?,
            tags: tags.ok_or_else(|| Error::MissingTags(path.clone()))?,
            summary: summary.ok_or_else(|| Error::MissingSummary(path.clone()))?,
            prior: None,
            next: None,
        });
    }

    let entries = entries.as_mut_slice();

    entries.sort_by(|a, b| b.date.cmp(&a.date));

    let len = entries.len();

    entries[0].next = entries.get(1).map(|e| (e.title, e.slug));
    for i in 1..len {
        entries[i].prior = entries.get(i - 1).map(|e| (e.title, e.slug));
        entries[i].next = entries.get(i + 1).map(|e| (e.title, e.slug));
    }

    json::write_summary(entries)?;

    json::write_detail(entries)?;

    amp::write(entries)?;

    rss::write(entries)?;

    Ok(())
}
