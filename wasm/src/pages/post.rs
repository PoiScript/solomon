use maud::html;
use wasm_bindgen::JsValue;

use crate::context::{Content, Context};
use crate::pages::not_found::not_found;
use crate::partials::{
    Article, Footer, Header, Heading, Mode, OgDescription, Schema, TableOfContent, UpNext,
};

pub async fn post(mut ctx: Context, slug: &str, is_amp: bool) -> Result<Context, JsValue> {
    ctx.load_org_meta().await?;
    ctx.load_img_meta().await?;

    let key = format!("/post/{}", slug);

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
            " · "
            a.source target="_blank" href={ (key)".org" } { "source" }
        }
        .into_string();

        let (prev, next) = ctx.find_prev_and_next(&meta.published);

        let body = html! {
            (Header)
            main.main {
                (Heading { title: &meta.title, subtitle: Some(&subtitle) })
                (TableOfContent { org: &org })
                (Article {
                    mode: if cfg!(feature = "worker") && is_amp { Mode::Amp } else { Mode::Html },
                    org: &org,
                    ctx: &ctx
                })
                (UpNext { prev, next })
            }
            (Footer)
        };

        let head = html! {
            title { (meta.title)"☆Solomon" }
            meta property="og:title" content={ (meta.title)"☆Solomon" };
            meta property="og:type" content="article";
            meta property="og:image" content={ (ctx.base_url)"/amp-image.jpg"};
            meta property="og:url" content={ (ctx.base_url)(meta.slug)};
            (OgDescription { org: &org })
            @if cfg!(feature = "worker") && is_amp {
                link rel="canonical" href={ (ctx.base_url)(meta.slug)};
                script type="application/ld+json" { (Schema { ctx: &ctx, meta }) }
            } @else {
                link rel="amphtml" href={ (ctx.base_url)"/amp"(meta.slug) };
            }
        };

        let status = 200;

        ctx.content = if cfg!(feature = "worker") && is_amp {
            Content::Amp { status, head, body }
        } else {
            Content::Html { status, head, body }
        };

        Ok(ctx)
    } else {
        not_found(ctx).await
    }
}
