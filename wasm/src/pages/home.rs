use maud::html;
use wasm_bindgen::prelude::*;

use crate::context::{Content, Context};
use crate::partials::{Footer, Header, PostItem};

pub async fn home(mut ctx: Context) -> Result<Context, JsValue> {
    ctx.load_org_meta().await?;

    let mut posts: Vec<_> = ctx
        .org_meta
        .values()
        .filter(|org| org.slug.starts_with("/post/"))
        .collect();

    posts.sort_by(|a, b| b.published.cmp(&a.published));

    ctx.content = Content::Html {
        status: 200,
        head: html! {
            title { "Home☆Solomon" }
            meta property="og:title" content="Home☆Solomon";
            meta property="og:type" content="website";
            meta property="og:image" content={ (ctx.base_url)"/amp-image.jpg"};
            meta property="og:url" content={ (ctx.base_url) };
        },
        body: html! {
            (Header)
            main.main {
                @for post in posts {
                    (PostItem { meta: post })
                }
            }
            (Footer)
        },
    };

    Ok(ctx)
}
