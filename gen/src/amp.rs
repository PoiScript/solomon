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
    entry.org.write_html_custom(&mut vec, &mut handler)?;

    let amp = String::from_utf8(vec)?;

    let json = object! {
        "@context" => "http://schema.org",
        "@type" => "BlogPosting",
        "dateModified" => entry.updated.as_ref().unwrap_or(&entry.published).to_rfc3339(),
        "datePublished" => entry.published.to_rfc3339(),
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
        html amp? lang="zh-Hans" i-amphtml-layout? i-amphtml-no-boilerplate? transformed="self;v=1" {
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
                header.toolbar.header {
                    .container {
                        a.homepage.link href="https://blog.poi.cat" {
                            span.logo {
                                svg focusable="false"
                                    height="100%"
                                    width="100%"
                                    preserveAspectRatio="xMidYMid meet"
                                    xmlns="http://www.w3.org/2000/svg"
                                {
                                    g fill="none" stroke="currentColor" stroke-width="1.6" {
                                        path d="M11.6 17.2H4L14.4 1.6l-10 6 7.2 9.6z" {  }
                                        path d="M12.4 6.8H20L9.6 22.4l10-6-7.2-9.6z" {  }
                                    }
                                }
                            }
                            span { "Solomon" }
                        }
                        span.spacer { }
                        a.link href="https://blog.poi.cat/about" { "About" }
                        span.separator { "/" }
                        a.link href="https://blog.poi.cat/link" { "Link" }
                    }
                }
                main.main {
                    .title-section {
                        h1.title { (entry.title) }
                        h2.subtitle {
                            (entry.published.format("%b %e, %Y"))
                            " · "
                            (entry.tags.iter().map(|t| format!("#{}", t)).collect::<Vec<_>>().join(" "))
                        }
                    }
                    article { (PreEscaped(amp)) }
                    .up-next {
                        .nav.start {
                            @if let Some(prev) = prev {
                                a.link.start href={"https://blog.poi.cat/post/" (prev.slug)} {
                                    .icon.left {
                                        svg fill="currentColor"
                                            focusable="false"
                                            height="100%"
                                            preserveAspectRatio="xMidYMid meet"
                                            width="100%"
                                            xmlns="http://www.w3.org/2000/svg"
                                        {
                                            path d="M15.4 16.6L10.8 12l4.6-4.6L14 6l-6 6 6 6 1.4-1.4z" {  }
                                        }
                                    }
                                    div {
                                        .label { "Prev" }
                                        .title { (prev.title) }
                                    }
                                }
                            }
                        }
                        .nav.end {
                            @if let Some(next) = next {
                                a.link.end href={"https://blog.poi.cat/post/" (next.slug)} {
                                    div {
                                        .label { "Next" }
                                        .title { (next.title) }
                                    }
                                    .icon.right {
                                        svg fill="currentColor"
                                            focusable="false"
                                            height="100%"
                                            width="100%"
                                            preserveAspectRatio="xMidYMid meet"
                                            xmlns="http://www.w3.org/2000/svg"
                                        {
                                            path d="M8.6 16.3l4.6-4.6-4.6-4.5L10 5.7l6 6-6 6z" { }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                footer.toolbar.footer {
                    .container {
                        a.link href="https://blog.poi.cat/atom.xml" { "RSS" }
                        span.separator { "/" }
                        a.link href="https://github.com/PoiScript/solomon" { "GitHub" }
                        span.spacer { }
                        span.license { "CC-BY-SA-4.0" }
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
