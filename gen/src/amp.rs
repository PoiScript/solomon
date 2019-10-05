use json::object;
use maud::{html, PreEscaped, DOCTYPE};
use std::fs;

use crate::{entry::Entry, error::Result, handlers::SolomonAmpHandler};

pub fn write(entries: &[Entry]) -> Result<()> {
    match entries.len() {
        0 => {}
        1 => {
            write_amp(&entries[0], None, None)?;
        }
        len @ _ => {
            write_amp(&entries[0], None, Some(&entries[1]))?;

            for windows in entries.windows(3) {
                write_amp(&windows[1], Some(&windows[0]), Some(&windows[2]))?;
            }

            write_amp(&entries[len - 1], Some(&entries[len - 2]), None)?;
        }
    }

    Ok(())
}

fn write_amp(entry: &Entry, prev: Option<&Entry>, next: Option<&Entry>) -> Result<()> {
    let mut handler = SolomonAmpHandler::default();

    let mut vec = Vec::new();
    entry.org.html_with_handler(&mut vec, &mut handler)?;

    let amp = String::from_utf8(vec)?;

    let json = object! {
        "@context" => "http://schema.org",
        "@type" => "BlogPosting",
        "dateModified" => entry.date.to_rfc3339(),
        "datePublished" => entry.date.to_rfc3339(),
        "headline" => &*entry.title,
        "image" => "https://blog.poi.cat/amp-image.jpg",
        "author" => object! {
            "@type"=> "Person",
            "name"=> "PoiScript"
        },
        "publisher"=> object! {
            "@type" => "Organization",
            "name"=> "Solomon",
            "url" => "https://blog.poi.cat",
            "description"=> "PoiScript's Blog",
            "logo" => object! {
                "@type" => "ImageObject",
                "url" => "https://blog.poi.cat/amp-logo.jpg",
                "height" => 60,
                "width" => 600
            }
        }
    };

    let markup = html! {
        (DOCTYPE)
        html amp? i-amphtml-layout? i-amphtml-no-boilerplate? transformed="self;v=1" {
            head {
                meta charset="utf-8";
                style amp-runtime? i-amphtml-version="011909181902540" {
                    (PreEscaped(include_str!("../etc/amp-runtime.011909181902540.css")))
                }
                link rel="preload" href="https://cdn.ampproject.org/v0.js" as="script";
                meta name="viewport" content="width=device-width,minimum-scale=1";
                script async? src="https://cdn.ampproject.org/v0.js" {  }
                script async?
                    custom-element="amp-install-serviceworker"
                    src="https://cdn.ampproject.org/v0/amp-install-serviceworker-0.1.js" {  }
                style amp-custom? {
                    (PreEscaped(include_str!("../etc/amp-custom.css")))
                }
                link rel="canonical" href={"https://blog.poi.cat/post/" (entry.slug)};
                title { (entry.title) "☆Solomon" }
                script type="application/ld+json" {
                    (PreEscaped(json.to_string()))
                }
            }
            body {
                amp-install-serviceworker
                    layout="nodisplay"
                    src="https://blog.poi.cat/ngsw-worker.js"
                    data-iframe-src={"https://blog.poi.cat/amp/" (entry.slug)}
                    class="i-amphtml-layout-nodisplay"
                    hidden="hidden"
                    i-amphtml-layout="nodisplay" { }
                .root {
                    header.toolbar.header {
                        .container {
                            a.homepage.link href="https://blog.poi.cat" { "Solomon" }
                            span.spacer { }
                            a.link href="https://blog.poi.cat/about" { "About" }
                            span.separator { "/" }
                            a.link href="https://blog.poi.cat/link" { "Link" }
                        }
                    }
                    .main {
                        .title-section {
                            h1.title { (entry.title) }
                            h2.subtitle {
                                (entry.date.format("%b %e, %Y"))
                                " · "
                                (entry.tags.iter().map(|t| format!("#{}", t)).collect::<Vec<_>>().join(" "))
                            }
                        }
                        article { (PreEscaped(amp)) }
                        .up-next {
                            .nav.prev {
                                @if let Some(prev) = prev {
                                    a.link.prev href={"https://blog.poi.cat/post/" (prev.slug)} {
                                        div {
                                            .label{ "Prev" }
                                            .title{ (prev.title) }
                                        }
                                    }
                                }
                            }
                            .nav.next {
                                @if let Some(next) = next {
                                    a.link.next href={"https://blog.poi.cat/post/" (next.slug)} {
                                        div {
                                            .label{ "Next" }
                                            .title{ (next.title) }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    footer.toolbar.footer {
                        .container {
                            .links {
                                a.link href="https://blog.poi.cat/atom.xml"{ "RSS" }
                                span.separator { "/" }
                                a.link href="https://github.com/PoiScript/solomon" { "GitHub"}
                            }
                            span.spacer { }
                            span.license{ "CC-BY-SA-4.0" }
                        }
                    }
                }
            }
        }
    };

    fs::write(
        format!("assets/amp/{}.html", entry.slug),
        markup.into_string(),
    )?;

    Ok(())
}
