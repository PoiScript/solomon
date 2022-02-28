use std::fmt::Write;
use wasm_bindgen::prelude::*;

use crate::context::{Content, Context};

pub async fn sitemap(mut ctx: Context) -> Result<Context, JsValue> {
    ctx.load_org_meta().await?;

    let mut body = String::new();

    let base_url = ctx.base_url.as_str();

    let _ = writeln!(&mut body, "{base_url}");
    let _ = writeln!(&mut body, "{base_url}/link");

    // posts
    {
        for post in ctx.org_meta.values() {
            let slug = post.slug.as_str();
            let _ = writeln!(&mut body, "{base_url}{slug}");
            let _ = writeln!(&mut body, "{base_url}/amp{slug}");
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
            let _ = writeln!(&mut body, "{base_url}/tag/{tag}");
        }
    }

    ctx.content = Content::Txt { status: 200, body };

    Ok(ctx)
}
