use maud::html;
use wasm_bindgen::prelude::*;

use crate::context::{Content, Context};
use crate::partials::{Footer, Header, Heading};

pub struct Link {
    id: &'static str,
    src: &'static str,
    name: &'static str,
}

pub const LINKS: &[Link] = &[
    Link {
        id: "petercxy",
        src: "https://typeblog.net",
        name: "PeterCxy",
    },
    Link {
        id: "fiveyellowmice",
        src: "https://fiveyellowmice.com",
        name: "FiveYellowMice",
    },
    Link {
        id: "lilydjwg",
        src: "https://blog.lilydjwg.me",
        name: "依云",
    },
    Link {
        id: "kenookamihoro",
        src: "https://blog.yoitsu.moe",
        name: "ヨイツの賢狼ホロ",
    },
    Link {
        id: "felixonmars",
        src: "https://blog.felixc.at",
        name: "Felix Yan",
    },
    Link {
        id: "farseerfc",
        src: "https://farseerfc.me",
        name: "farseerfc",
    },
    Link {
        id: "biergaizi",
        src: "https://tomli.blog",
        name: "比尔盖子",
    },
    Link {
        id: "void001",
        src: "https://void-shana.moe",
        name: "VOID001",
    },
    Link {
        id: "wengxt",
        src: "https://marisa-kirisa.me",
        name: "CS Slayer",
    },
    Link {
        id: "xiaoyu2016",
        src: "https://www.rabbittu.com",
        name: "NyanRabbit",
    },
    Link {
        id: "neofelhz",
        src: "https://blog.nfz.moe",
        name: "neoFelhz",
    },
    Link {
        id: "sherlock-holo",
        src: "https://sherlock-holo.github.io",
        name: "Sherlock Holo",
    },
    Link {
        id: "tsuki",
        src: "https://blog.sukitsuki.com",
        name: "Tsuka Tsuki",
    },
    Link {
        id: "equim-chan",
        src: "https://ekyu.moe",
        name: "Equim",
    },
    Link {
        id: "nanpuyue",
        src: "https://blog.nanpuyue.com",
        name: "南浦月",
    },
    Link {
        id: "szclsya",
        src: "https://szclsya.me",
        name: "Leo Shen",
    },
];

pub async fn link(mut ctx: Context) -> Result<Context, JsValue> {
    ctx.content = Content::Html {
        status: 200,
        head: html! {
            title { "Link☆Solomon" }
            meta property="og:title" content="Link☆Solomon";
            meta property="og:type" content="website";
            meta property="og:image" content={ (ctx.base_url)"/amp-image.jpg"};
            meta property="og:url" content={ (ctx.base_url)"/link" };
        },
        body: html! {
            (Header)
            main.main {
                (Heading {  title: "Link", subtitle: None })
                ."link-list" {
                    @for link in LINKS.iter() {
                        a.item target="_blank" href=(link.src) {
                            img.profile
                                src={ (ctx.base_url)"/avatars/"(link.id)".jpg"}
                                alt={ "avatar for "(link.name) };
                            .text {
                                .line { (link.name) }
                                .line { (link.src) }
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
