use maud::html;
use wasm_bindgen::JsValue;

use crate::context::{Content, Context};
use crate::partials::{Article, Footer, Header, Heading, Mode, Schema, TableOfContent};

use super::not_found::not_found;

pub async fn about(mut ctx: Context, is_amp: bool) -> Result<Context, JsValue> {
    let key = "/about";

    if let Some(meta) = ctx.org_meta.get(key) {
        let content = ctx.load_org(key).await?;
        let org = orgize::Org::parse(&content);

        let body = html! {
            (Header)
            main.main {
                (Heading { title: &meta.title, subtitle: None })
                (TableOfContent { org: &org })
                (Article {
                    mode: if is_amp { Mode::Amp } else { Mode::Html },
                    org: &org,
                    ctx: &ctx
                })
            }
            (Footer)
        };

        ctx.content = if is_amp {
            Content::Amp {
                status: 200,
                body,
                head: html! {
                    title { "About☆Solomon" }
                    link rel="canonical" href="/about";
                    script type="application/ld+json" { (Schema { meta }) }
                },
            }
        } else {
            Content::Html {
                status: 200,
                body,
                head: html! {
                    title { "About☆Solomon" }
                    link rel="amphtml" href="/amp/about";
                },
            }
        };

        Ok(ctx)
    } else {
        not_found(ctx).await
    }
}
