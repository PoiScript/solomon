use std::fs::File;
use std::io::{Result, Write};

use crate::Entry;

pub fn write(entries: &[Entry<'_>]) -> Result<()> {
    for entry in entries {
        let w = &mut File::create(format!("assets/post/{}.amp", entry.slug))?;

        write!(w, "<!doctype html>")?;
        write!(w, "<html ⚡>")?;
        write!(w, "<head>")?;
        write!(w, r#"<meta charset="utf-8">"#)?;
        write!(w, r#"<link rel="canonical" href="{}.html">"#, entry.slug)?;
        write!(
            w,
            r#"<meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">"#
        )?;
        write!(
            w,
            "<style amp-boilerplate>\
             body{{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;\
             -moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;\
             -ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;\
             animation:-amp-start 8s steps(1,end) 0s 1 normal both}}\
             @-webkit-keyframes -amp-start{{from{{visibility:hidden}}to{{visibility:visible}}}}\
             @-moz-keyframes -amp-start{{from{{visibility:hidden}}to{{visibility:visible}}}}\
             @-ms-keyframes -amp-start{{from{{visibility:hidden}}to{{visibility:visible}}}}\
             @-o-keyframes -amp-start{{from{{visibility:hidden}}to{{visibility:visible}}}}\
             @keyframes -amp-start{{from{{visibility:hidden}}to{{visibility:visible}}}}\
             </style><noscript><style amp-boilerplate>\
             body{{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}}\
             </style></noscript>"
        )?;
        write!(
            w,
            r#"<script async src="https://cdn.ampproject.org/v0.js"></script>"#
        )?;
        write!(
            w,
            r#"<script async custom-element="amp-lightbox-gallery" src="https://cdn.ampproject.org/v0/amp-lightbox-gallery-0.1.js"></script>"#
        )?;
        write!(w, "</head>")?;
        write!(w, "<body><article>{}</article></body>", &entry.amp)?;
        write!(w, "</html>")?;
    }

    Ok(())
}
