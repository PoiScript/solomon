use std::io::{Result as IOResult, Write};
use std::path::PathBuf;

use imagesize::ImageSize;
use lazy_static::lazy_static;
use orgize::export::*;
use syntect::html::{tokens_to_classed_spans, ClassStyle};
use syntect::parsing::{ParseState, SyntaxSet};
use url::Url;

use crate::error::Result;
use crate::Entry;

pub fn html<W: Write>(e: &Entry, w: &mut W) -> Result<()> {
    HtmlRender::new(
        SolomonHtmlHandler {
            amp: false,
            highlight: true,
        },
        w,
        &e.content,
    )
    .render()?;

    Ok(())
}

pub fn rss<W: Write>(e: &Entry, w: &mut W) -> Result<()> {
    write!(w, "<item>")?;
    write!(w, "<title><![CDATA[{}]]></title>", e.title)?;
    write!(w, "<link>https://blog.poi.cat/post/{}</link>", e.slug)?;
    write!(w, r#"<guid isPermaLink="false">{}</guid>"#, e.slug)?;
    for t in e.tags.split_whitespace() {
        write!(w, "<category><![CDATA[{}]]></category>", t)?;
    }
    write!(w, "<author>PoiScript</author>")?;
    write!(
        w,
        "<pubDate>{} 00:00:00 +0000</pubDate>",
        e.date.format("%a, %e %b %Y")
    )?;
    write!(w, "<description><![CDATA[")?;

    HtmlRender::new(
        SolomonHtmlHandler {
            amp: false,
            highlight: false,
        },
        w,
        &e.content,
    )
    .render()?;

    write!(w, "]]></description></item>")?;

    Ok(())
}

pub fn amp<W: Write>(e: &Entry, w: &mut W) -> Result<()> {
    write!(w, "<!doctype html>")?;
    write!(w, "<html ⚡>")?;
    write!(w, "<head>")?;
    write!(w, r#"<meta charset="utf-8">"#)?;
    write!(w, r#"<link rel="canonical" href="{}.html">"#, e.slug)?;
    write!(
        w,
        r#"<meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">"#
    )?;
    write!(
        w,
        "{}",
        "<style amp-boilerplate>\
         body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;\
         -moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;\
         -ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;\
         animation:-amp-start 8s steps(1,end) 0s 1 normal both}\
         @-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}\
         @-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}\
         @-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}\
         @-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}\
         @keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}\
         </style><noscript><style amp-boilerplate>\
         body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}\
         </style></noscript>"
    )?;
    write!(
        w,
        r#"<script async src="https://cdn.ampproject.org/v0.js"></script>"#
    )?;
    write!(w, "</head><body>")?;

    HtmlRender::new(
        SolomonHtmlHandler {
            amp: true,
            highlight: true,
        },
        w,
        &e.content,
    )
    .render()?;

    write!(w, "</body></html>")?;

    Ok(())
}

lazy_static! {
    static ref SYNTAX_SET: SyntaxSet = SyntaxSet::load_defaults_newlines();
}

struct SolomonHtmlHandler {
    amp: bool,
    highlight: bool,
}

impl<W: Write> HtmlHandler<W> for SolomonHtmlHandler {
    fn handle_src_block(&mut self, w: &mut W, cont: &str, args: Option<&str>) -> IOResult<()> {
        let syntax = args
            .filter(|_| self.highlight)
            .map(|a| a.trim().split_ascii_whitespace().next().unwrap_or(a))
            .and_then(|l| SYNTAX_SET.find_syntax_by_token(l));

        if let Some(syntax) = syntax {
            let mut state = ParseState::new(&syntax);
            let mut spans = 0;

            write!(w, "<pre><code>")?;

            for line in cont.lines() {
                let (line, delta) = tokens_to_classed_spans(
                    line,
                    &state.parse_line(line, &SYNTAX_SET),
                    ClassStyle::Spaced,
                );
                spans += delta;
                writeln!(w, "{}", line)?;
            }

            assert!(spans >= 0);

            write!(w, "{:1$}</pre></code>", "</span>", spans as usize)
        } else {
            write!(w, "<pre><code>{}</code></pre>", cont)
        }
    }

    fn handle_link(&mut self, w: &mut W, path: &str, desc: Option<&str>) -> IOResult<()> {
        let url = Url::parse(path).unwrap();
        if url.scheme() == "file" {
            let path = &url.path()[1..];

            let ImageSize { width, height } =
                imagesize::size(PathBuf::from(r"content/post").join(path)).unwrap();

            if self.amp {
                write!(
                    w,
                    r#"<amp-img src="{}" alt="" height="{}" width="{}"></amp-img>"#,
                    path, height, width
                )
            } else {
                write!(
                    w,
                    r#"<div class="image-container"><div class="image" style="background-image: url({});padding-top: {:.7}%"></div></div>"#,
                    path,
                    (height as f32 / width as f32) * 100.
                )
            }
        } else if let Some(desc) = desc {
            write!(w, r#"<a href="{}">{}</a>"#, path, desc)
        } else {
            write!(w, r#"<a href="{0}">{0}</a>"#, path)
        }
    }
}
