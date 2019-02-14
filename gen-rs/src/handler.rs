use std::io::{Result, Write};

use url::Url;

use orgize::export::*;

pub struct SolomonHtmlHandler;

impl<W: Write> HtmlHandler<W> for SolomonHtmlHandler {
    fn handle_link(&mut self, w: &mut W, path: &str, desc: Option<&str>) -> Result<()> {
        let url = Url::parse(path).unwrap();
        if url.scheme() == "file" {
            write!(w, r#"<div class="image-container"><div class="image" style="background-image: url({});"></div></div>"#, &url.path()[1..])
        } else {
            if let Some(desc) = desc {
                write!(w, r#"<a href="{}">{}</a>"#, path, desc)
            } else {
                write!(w, r#"<a href="{0}">{0}</a>"#, path)
            }
        }
    }
}
