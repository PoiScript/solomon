use maud::html;
use wasm_bindgen::JsValue;

use crate::context::{Content, Context};
use crate::partials::{
    Article, Footer, Header, Heading, Mode, OgDescription, Schema, TableOfContent,
};

use super::not_found::not_found;

pub async fn about(mut ctx: Context, is_amp: bool) -> Result<Context, JsValue> {
    ctx.load_org_meta().await?;

    let key = "/about";

    if let Some(meta) = ctx.org_meta.get(key) {
        let content = ctx.load_org(key).await?;
        let org = orgize::Org::parse(&content);

        let subtitle = html! {
            (meta.published.format("%F"))
            " · "
            a.source target="_blank" href={ (key)".org" } { "source" }
        }
        .into_string();

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
            }
            (Footer)
        };

        let head = html! {
            title { "About☆Solomon" }
            meta property="og:title" content="About☆Solomon";
            meta property="og:type" content="article";
            meta property="og:image" content={ (ctx.base_url)"/amp-image.jpg"};
            meta property="og:url" content={ (ctx.base_url)"/about" };
            (OgDescription { org: &org })
            @if cfg!(feature = "worker") && is_amp {
                link rel="canonical" href={ (ctx.base_url)"/about" };
                script type="application/ld+json" { (Schema { ctx: &ctx, meta }) }
            } @else {
                link rel="amphtml" href={ (ctx.base_url)"/amp/about" };
            }
        };

        let status = 200;

        ctx.content = if cfg!(feature = "worker") && is_amp {
            Content::Amp { status, body, head }
        } else {
            Content::Html { status, body, head }
        };

        Ok(ctx)
    } else {
        not_found(ctx).await
    }
}
