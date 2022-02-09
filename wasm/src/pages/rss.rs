use chrono::Utc;
use futures_util::future::try_join_all;
use maud::html;
use wasm_bindgen::prelude::*;

use crate::context::{Content, Context};
use crate::partials::{Article, Mode};

pub async fn rss(mut ctx: Context) -> Result<Context, JsValue> {
    ctx.load_org_meta().await?;

    let mut posts: Vec<_> = ctx
        .org_meta
        .values()
        .filter(|org| org.slug.starts_with("/post/"))
        .collect();

    posts.sort_by(|a, b| b.published.cmp(&a.published));

    posts.truncate(5);

    let orgs = try_join_all(posts.iter().map(|post| ctx.load_org(&post.slug))).await?;

    ctx.content = Content::Rss {
        status: 200,
        body: html! {
            rss version="2.0"
                xmlns:atom="http://www.w3.org/2005/Atom"
                xmlns:content="http://purl.org/rss/1.0/modules/content/"
                xmlns:dc="http://purl.org/dc/elements/1.1/"
            {
                channel {
                    title { "solomon" }
                    description { "PoiScript's Blog" }
                    link rel="self" href="https://blog.poi.cat/rss" {}
                    link rel="alternate" href="https://blog.poi.cat" {}
                    generator { "solomon "(env!("CARGO_PKG_VERSION")) }
                    lastBuildDate { (Utc::now().to_rfc2822()) }
                    language { "zh-Hans" }
                    copyright { "Content licensed under CC-BY-SA-4.0." }
                    @for (post, org) in posts.iter().zip(orgs.iter()) {
                        item {
                            title { (&post.title) }
                            author { "PoiScript" }
                            link { "https://blog.poi.cat"(post.slug) }
                            guid isPermaLink="false" { (post.slug) }
                            @for tag in &post.tags {
                                category { (tag) }
                            }
                            pubDate { (post.published.to_rfc2822()) }
                            description {
                                (Article {
                                    mode: Mode::Rss,
                                    org: &orgize::Org::parse(&org),
                                    ctx: &ctx,
                                })
                            }
                        }
                    }
                }
            }
        },
    };

    Ok(ctx)
}
