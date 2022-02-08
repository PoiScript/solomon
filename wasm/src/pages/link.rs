use maud::html;
use wasm_bindgen::prelude::*;

use crate::context::{Content, Context};
use crate::partials::{Footer, Header, Heading};

pub const LINKS: &[(&str, &str, &str)] = &[
    ("https://typeblog.net/", "PeterCxy", "PeterCxy"),
    (
        "https://fiveyellowmice.com/",
        "FiveYellowMice",
        "FiveYellowMice",
    ),
    ("http://blog.lilydjwg.me/", "lilydjwg", "依云"),
    (
        "https://blog.yoitsu.moe/",
        "KenOokamiHoro",
        "ヨイツの賢狼ホロ",
    ),
    ("https://blog.felixc.at/", "felixonmars", "Felix Yan"),
    ("https://farseerfc.me/", "farseerfc", "farseerfc"),
    ("https://tomli.blog/", "biergaizi", "比尔盖子"),
    ("https://void-shana.moe/", "VOID001", "VOID001"),
    ("https://marisa-kirisa.me/", "wengxt", "CS Slayer"),
    ("https://www.rabbittu.com/", "xiaoyu2016", "NyanRabbit"),
    ("https://blog.nfz.moe/", "neofelhz", "neoFelhz"),
    (
        "https://sherlock-holo.github.io/",
        "Sherlock-Holo",
        "Sherlock Holo",
    ),
    ("https://blog.sukitsuki.com/", "tsuki", "Tsuka Tsuki"),
    ("https://ekyu.moe/", "Equim-chan", "Equim"),
    ("https://blog.nanpuyue.com", "nanpuyue", "南浦月"),
];

pub async fn link(mut ctx: Context) -> Result<Context, JsValue> {
    ctx.content = Content::Html {
        status: 200,
        head: html! {
            title { "Link☆Solomon" }
        },
        body: html! {
            (Header)
            main.main {
                (Heading {  title: "Link", subtitle: None })
                ."link-list" {
                    @for link in LINKS.iter() {
                        a.item target="_blank" href=(link.0) {
                            img.profile
                                src={ (ctx.base_url)"avatars/"(link.1)".jpg"}
                                alt={ "avatar for "(link.2) };
                            .text {
                                .title { (link.2) }
                            }
                        }
                    }
                }
            }
            (Footer)
        },
    };

    Ok(ctx)
}
