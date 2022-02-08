use wasm_bindgen::prelude::*;

use crate::context::{Content, Context};

pub async fn version(mut ctx: Context) -> Result<Context, JsValue> {
    ctx.content = Content::Txt {
        status: 200,
        body: ctx.get_version(),
    };

    Ok(ctx)
}
