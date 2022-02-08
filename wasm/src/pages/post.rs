use maud::html;
use wasm_bindgen::JsValue;

use crate::context::{Content, Context};
use crate::partials::{Article, Footer, Header, Heading, Mode, Schema, TableOfContent, UpNext};

use super::not_found::not_found;

pub async fn post(mut ctx: Context, slug: &str, is_amp: bool) -> Result<Context, JsValue> {
    ctx.load_org_meta().await?;
    ctx.load_img_meta().await?;

    let key = format!("/post/{}", slug.trim_end_matches(".html"));

    if let Some(meta) = ctx.org_meta.get(&key) {
        let content = ctx.load_org(&key).await?;
        let org = orgize::Org::parse(&content);

        let subtitle = html! {
            (meta.published.format("%F"))
            " ·"
            @for tag in &meta.tags {
                " "
                a.tag data-router href={ "/tag/"(tag) } {
                    "#" (tag)
                }
            }
        }
        .into_string();

        let body = html! {
            (Header)
            main.main {
                (Heading { title: &meta.title, subtitle: Some(&subtitle) })
                (TableOfContent { org: &org })
                article {
                    (Article { mode: Mode::Html, org: &org, ctx: &ctx })
                }
                (UpNext { next: &None, prev: &None })
            }
            (Footer)
        };

        ctx.content = if is_amp {
            Content::Amp {
                status: 200,
                head: html! {
                    title { (meta.title)"☆Solomon" }
                    link rel="canonical" href=(meta.slug);
                    script type="application/ld+json" { (Schema { meta: &meta }) }
                },
                body,
            }
        } else {
            Content::Html {
                status: 200,
                head: html! {
                    title { (meta.title)"☆Solomon" }
                    link rel="amphtml" href={ "/amp"(meta.slug) };
                },
                body,
            }
        };

        Ok(ctx)
    } else {
        not_found(ctx).await
    }
}
