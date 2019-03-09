use std::io::{Result as IOResult, Write};
use std::path::PathBuf;

use imagesize::ImageSize;
use orgize::export::*;
use url::Url;

use crate::error::Result;

pub fn render<W: Write>(content: &str, writer: W) -> Result<W> {
    let mut render = HtmlRender::new(SolomonHtmlHandler, writer, &content);
    render.render()?;
    Ok(render.into_writer())
}

struct SolomonHtmlHandler;

impl<W: Write> HtmlHandler<W> for SolomonHtmlHandler {
    fn handle_link(&mut self, w: &mut W, path: &str, desc: Option<&str>) -> IOResult<()> {
        let url = Url::parse(path).unwrap();
        if url.scheme() == "file" {
            let path = &url.path()[1..];

            let ImageSize { width, height } =
                imagesize::size(PathBuf::from(r"content/post").join(path)).unwrap();

            write!(
                w,
                r#"<div class="image-container"><div class="image" style="background-image: url({});padding-top: {:.7}%"></div></div>"#,
                path,
                (height as f32 / width as f32) * 100.
            )
        } else if let Some(desc) = desc {
            write!(w, r#"<a href="{}">{}</a>"#, path, desc)
        } else {
            write!(w, r#"<a href="{0}">{0}</a>"#, path)
        }
    }
}
