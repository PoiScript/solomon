use crate::{error::Result, Entry};
use maud::{html, PreEscaped, DOCTYPE};
use std::{fs::File, io::Write};

pub fn write(entries: &[Entry<'_>]) -> Result<()> {
    for entry in entries {
        let markup = html! {
            (DOCTYPE)
            html amp? {
                head {
                    meta charset="utf-8";
                    link rel="canonical" href={ "https://blog.poi.cat/post/" (entry.slug) };
                    meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1";
                    title { (entry.title) }
                    style amp-boilerplate? {
                        "body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;"
                        "-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;"
                        "-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;"
                        "animation:-amp-start 8s steps(1,end) 0s 1 normal both}"
                        "@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}"
                        "@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}"
                        "@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}"
                        "@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}"
                        "@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}"
                    }
                    noscript {
                        style amp-boilerplate? {
                            "body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}"
                        }
                    }
                    style amp-custom? { (PreEscaped(include_str!("amp.css"))) }
                    script async? src="https://cdn.ampproject.org/v0.js" { }
                    script async? custom-element="amp-lightbox-gallery" src="https://cdn.ampproject.org/v0/amp-lightbox-gallery-0.1.js" { }
                }
                body {
                    div.root {
                        header.toolbar.header {
                            div.container {
                                a.link href="https://blog.poi.cat/" {
                                    svg.logo focusable="false" xmlns="http://www.w3.org/2000/svg" width="24" height="24" {
                                        g fill="none" stroke="#fff" stroke-width="1.4" {
                                            path d="M11.6 17.2H4L14.4 1.6l-10 6 7.2 9.6z" { }
                                            path d="M12.4 6.8H20L9.6 22.4l10-6-7.2-9.6z" { }
                                        }
                                    }
                                    "Solomon" span.tail { "- PoiScript's Blog" }
                                }
                                span.spacer { }
                                a.link href="https://blog.poi.cat/about" { "About" }
                                span.separator { }
                                a.link href="https://blog.poi.cat/link" { "Link" }
                            }
                        }
                        main {
                            div.container {
                                div.title-section {
                                    h1.title { (entry.title) }
                                    h2.subtitle {
                                        (entry.date.format("%a, %e %b %Y")) " · "
                                        @for tag in &entry.tags {
                                            a.tag href={ "https://blog.poi.cat/tag/" (tag) } {  "#" (tag) }
                                        }
                                    }
                                }
                                article { (PreEscaped(&entry.amp)) }
                                div.up-next {
                                    @if let Some(prior) = entry.prior {
                                        a.nav href={ "https://blog.poi.cat/post/" (prior.1) ".amp.html" } {
                                            span.icon.rotated role="img" {
                                                svg focusable="false" xmlns="http://www.w3.org/2000/svg" width="24" height="24" {
                                                    path d="M8.6 16.3l4.6-4.6-4.6-4.5L10 5.7l6 6-6 6z" {  }
                                                    path fill="none" d="M0-.3h24v24H0z" {  }
                                                }
                                            }
                                            div {
                                                div.label { "Prior" }
                                                div.title { ( prior.0 ) }
                                            }
                                        }
                                    }
                                    span.spacer {  }
                                    @if let Some(next) = entry.next {
                                        a.nav.next href={ "https://blog.poi.cat/post/" (next.1) ".amp.html" } {
                                            div.right {
                                                div.label { "Next" }
                                                div.title { (next.0) }
                                            }
                                            span.icon role="img" {
                                                svg focusable="false" xmlns="http://www.w3.org/2000/svg" width="24" height="24" {
                                                    path d="M8.6 16.3l4.6-4.6-4.6-4.5L10 5.7l6 6-6 6z" {  }
                                                    path fill="none" d="M0-.3h24v24H0z" {  }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        footer.toolbar.footer {
                            div.container {
                                div.links {
                                    a.link href="https://blog.poi.cat/atom.xml" { "RSS" }
                                    span.separator {  }
                                    a.link href="https://github.com/PoiScript/solomon" { "GitHub" }
                                }
                                span.spacer { }
                                span.license {
                                    span.head { "Content licensed under" } "CC-BY-SA-4.0"
                                }
                            }
                        }
                    }
                }
            }
        };

        File::create(format!("assets/post/{}.amp.html", entry.slug))?
            .write_all(markup.into_string().as_bytes())?;
    }

    Ok(())
}
