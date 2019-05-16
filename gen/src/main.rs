#![feature(proc_macro_hygiene)]

mod entry;
mod error;
mod render;
mod rss;

use crate::entry::{group_by_year, Entry};
use crate::render::render;
use error::Result;
use std::{fs, path::PathBuf};

fn walk_dirs(dir: &PathBuf, files: &mut Vec<String>) -> Result<()> {
    for entry in fs::read_dir(dir)? {
        let path = entry?.path();
        if path.is_dir() {
            walk_dirs(&path, files)?;
        } else if let Some(ext) = path.extension() {
            if ext == "org" {
                files.push(fs::read_to_string(&path)?);
            }
        }
    }
    Ok(())
}

fn main() -> Result<()> {
    let mut files = Vec::new();
    walk_dirs(&PathBuf::from(r"content/post"), &mut files)?;

    let mut entries = Vec::with_capacity(files.len());
    for content in &files {
        entries.push(Entry::from(content)?);
    }
    entries.sort_by(|a, b| b.date.cmp(&a.date));

    entries[0].next = entries.get(1).map(Entry::info);
    for i in 1..entries.len() {
        entries[i].prior = entries.get(i - 1).map(Entry::info);
        entries[i].next = entries.get(i + 1).map(Entry::info);
    }

    fs::create_dir_all("assets/post")?;

    fs::write(
        "assets/post/about.html",
        render(&fs::read_to_string("content/about.org")?)?,
    )?;

    for entry in &entries {
        fs::write(
            format!("assets/post/{}.json", entry.slug),
            serde_json::to_string(entry)?,
        )?;
    }

    fs::write("assets/atom.xml", rss::markup(&entries).into_string())?;

    fs::write(
        "assets/posts.json",
        serde_json::to_string(&group_by_year(&entries))?,
    )?;

    Ok(())
}
