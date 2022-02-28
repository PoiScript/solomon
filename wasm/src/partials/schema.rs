use json::object;
use maud::Render;

use crate::context::{Context, OrgMeta};

pub struct Schema<'a> {
    pub ctx: &'a Context,
    pub meta: &'a OrgMeta,
}

impl<'a> Render for Schema<'a> {
    fn render_to(&self, buffer: &mut String) {
        let value = object! {
            "@context": "http://schema.org",
            "@type": "BlogPosting",
            "url": format!("{}/amp{}", self.ctx.base_url, self.meta.slug),
            "name": "Solomon",
            "headline": format!("{}☆Solomon", self.meta.title),
            "description": "PoiScript's Blog",
            "mainEntityOfPage": self.ctx.base_url.as_str(),
            "publisher": {
                "@type": "Organization",
                "name": "Solomon",
                "logo": {
                    "@type": "ImageObject",
                    "url": format!("{}/amp-logo.jpg", self.ctx.base_url),
                    "height": 60usize,
                    "width": 600usize
                }
            },
            "datePublished": self.meta.published.to_rfc2822(),
            "dateModified": self.meta.updated.map(|dt| dt.to_rfc2822()),
            "author": {
                "@type": "Person",
                "name": "PoiScript"
            }
        };

        let _ = value.write(unsafe { buffer.as_mut_vec() });
    }
}
