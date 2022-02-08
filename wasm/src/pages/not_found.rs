use maud::html;
use wasm_bindgen::JsValue;

use crate::context::{Content, Context};
use crate::partials::{Footer, Header, Heading};

pub async fn not_found(mut ctx: Context) -> Result<Context, JsValue> {
    ctx.content = Content::Html {
        status: 404,
        head: html! {
            title { "Not Found☆Solomon" }
        },
        body: html! {
            (Header)
            main.main {
                (Heading { title: "Not Found", subtitle: None })
                "Not Found"
            }
            (Footer)
        },
    };

    Ok(ctx)
}
