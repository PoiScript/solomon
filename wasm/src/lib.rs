use wasm_bindgen::prelude::*;

mod context;
mod pages;
mod partials;
mod utils;

#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

use context::Context;

#[wasm_bindgen]
pub async fn render(url: String, ctx: Context) -> Result<Context, JsValue> {
    std::panic::set_hook(Box::new(console_error_panic_hook::hook));

    let segs: Vec<_> = url.trim_matches('/').split('/').take(3).collect();

    match segs[..] {
        [""] => pages::home(ctx).await,

        ["about"] => pages::about(ctx, false).await,

        ["amp", "about"] => pages::about(ctx, true).await,

        ["post", slug] => pages::post(ctx, slug, false).await,

        ["amp", "post", slug] => pages::post(ctx, slug, true).await,

        ["tag", tag] => pages::tag(ctx, tag).await,

        ["link"] => pages::link(ctx).await,

        ["rss"] | ["feed.xml"] | ["atom.xml"] => pages::rss(ctx).await,

        ["sitemap"] => pages::sitemap(ctx).await,

        ["version"] => pages::version(ctx).await,

        _ => pages::not_found(ctx).await,
    }
}
