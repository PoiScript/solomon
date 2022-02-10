use wasm_bindgen::prelude::*;

mod context;
mod pages;
mod partials;
mod utils;

use context::Context;

#[wasm_bindgen]
pub async fn render(url: String, ctx: Context) -> Result<Context, JsValue> {
    std::panic::set_hook(Box::new(console_error_panic_hook::hook));

    let segs: Vec<&str> = url.split('/').skip(1).take(3).collect();

    match segs.as_slice() {
        [""] | ["index.html"] => pages::home(ctx).await,

        ["about"] | ["about.html"] => pages::about(ctx, false).await,

        ["amp", "about"] | ["amp", "about.html"] => pages::about(ctx, true).await,

        ["post", slug] => pages::post(ctx, slug.trim_end_matches(".html"), false).await,

        ["amp", "post", slug] => pages::post(ctx, slug.trim_end_matches(".html"), true).await,

        ["tag", tag] => pages::tag(ctx, tag.trim_end_matches(".html")).await,

        ["link"] | ["link.html"] => pages::link(ctx).await,

        ["rss"] | ["feed.xml"] => pages::rss(ctx).await,

        ["sitemap"] => pages::sitemap(ctx).await,

        ["version"] => pages::version(ctx).await,

        _ => pages::not_found(ctx).await,
    }
}
