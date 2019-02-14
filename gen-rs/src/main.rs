mod handler;
mod json;
mod rss;

use std::fs::{read_dir, File};
use std::io::{Cursor, Read, Result};
use std::path::PathBuf;

use chrono::NaiveDate;
use orgize::elements::Key;
use orgize::export::HtmlRender;
use orgize::tools::metadata;

use handler::SolomonHtmlHandler;

pub struct Entry<'a> {
    title: &'a str,
    date: NaiveDate,
    slug: &'a str,
    tags: &'a str,
    content: String,
}

fn main() -> Result<()> {
    let mut files = Vec::new();
    walk_dirs(&PathBuf::from(r"content/post"), &mut files)?;

    let mut entries = Vec::new();
    for (path, content) in files.iter() {
        let mut render = HtmlRender::new(SolomonHtmlHandler, Cursor::new(Vec::new()), &content);

        render.render()?;

        let (_toc, keywords, _) = metadata(&content);

        let (mut title, mut date, mut slug, mut tags) = (None, None, None, None);

        for (key, value) in keywords {
            match key {
                Key::Title => title = Some(value),
                Key::Date => date = Some(value),
                Key::Custom(key) if key == "TAGS" => tags = Some(value),
                Key::Custom(key) if key == "SLUG" => slug = Some(value),
                _ => (),
            }
        }

        let date = date
            .expect(&format!("date not found for {:?}", path))
            .trim();
        // 2017-03-01 Wed
        let date = NaiveDate::parse_from_str(&date[1..date.len() - 1], "%Y-%m-%d %a")
            .expect(&format!("Can't parse {:?}", date));

        entries.push(Entry {
            date,
            content: String::from_utf8(render.into_writer().into_inner()).expect("invalid utf-8"),
            title: title.expect(&format!("title not found for {:?}", path)),
            slug: slug.expect(&format!("slug not found for {:?}", path)),
            tags: tags.expect(&format!("tags not found for {:?}", path)),
        });
    }

    json::write_summary(&mut entries)?;

    json::write_detail(&mut entries)?;

    entries.sort_by(|a, b| b.date.cmp(&a.date));

    rss::write(&mut File::create("assets/atom.xml")?, entries)

    // TODO: amp
}

fn walk_dirs(dir: &PathBuf, files: &mut Vec<(PathBuf, String)>) -> Result<()> {
    for entry in read_dir(dir)? {
        let path = entry?.path();
        if path.is_dir() {
            walk_dirs(&path, files)?;
        } else if path.extension().map(|ext| ext == "org").unwrap_or(false) {
            let mut content = String::new();
            File::open(&path)?.read_to_string(&mut content)?;
            files.push((path, content));
        }
    }

    Ok(())
}
