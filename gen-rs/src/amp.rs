use std::fs::File;
use std::io::Write;

use crate::{
    error::{Error, Result},
    Entry,
};
use askama::Template;
use html_minifier::minify;

#[derive(Template)]
#[template(path = "amp.html")]
struct AmpTemplate<'a> {
    entry: &'a Entry<'a>,
}

pub fn write(entries: &[Entry<'_>]) -> Result<()> {
    for entry in entries {
        let amp = AmpTemplate { entry };

        let mut file = File::create(format!("assets/post/{}.amp.html", entry.slug))?;

        file.write_all(minify(amp.render()?).map_err(Error::Minifier)?.as_bytes())?;
    }

    Ok(())
}
