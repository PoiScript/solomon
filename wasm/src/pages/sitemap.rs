use std::fmt::Write;
use wasm_bindgen::prelude::*;

use crate::context::{Content, Context};

pub async fn sitemap(mut ctx: Context) -> Result<Context, JsValue> {
    ctx.load_org_meta().await?;

    let mut body = String::new();

    let _ = writeln!(&mut body, "https://blog.poi.cat/");
    let _ = writeln!(&mut body, "https://blog.poi.cat/link");

    // posts
    {
        for post in ctx.org_meta.values() {
            let _ = writeln!(&mut body, "https://blog.poi.cat{}", post.slug);
            let _ = writeln!(&mut body, "https://blog.poi.cat/amp{}", post.slug);
        }
    }

    // tags
    {
        let mut tags = ctx
            .org_meta
            .values()
            .map(|p| p.tags.iter())
            .flatten()
            .collect::<Vec<_>>();

        tags.sort();
        tags.dedup();

        for tag in tags {
            let _ = writeln!(&mut body, "https://blog.poi.cat/tag/{} ", tag);
        }
    }

    ctx.content = Content::Txt { status: 200, body };

    Ok(ctx)
}
