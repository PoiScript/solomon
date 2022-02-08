use maud::html;
use wasm_bindgen::JsValue;

use crate::context::{Content, Context};
use crate::partials::{Footer, Header, Heading, PostItem};

pub async fn tag(mut ctx: Context, tag: &str) -> Result<Context, JsValue> {
    ctx.load_org_meta().await?;

    let tag = tag.trim_end_matches(".html");

    let mut posts: Vec<_> = ctx
        .org_meta
        .values()
        .filter(|org| org.tags.iter().any(|t| t == tag))
        .collect();

    posts.sort_by(|a, b| b.published.cmp(&a.published));

    ctx.content = Content::Html {
        status: 200,
        head: html! {
            title { "#"(tag)"☆Solomon" }
        },
        body: html! {
            (Header)
            main.main {
                ( Heading { title: &format!("#{}", tag), subtitle: None } )
                @for post in posts {
                    ( PostItem { meta: post } )
                }
            }
            (Footer)
        },
    };

    Ok(ctx)
}
