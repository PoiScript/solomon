use json::object;
use maud::Render;

use crate::context::OrgMeta;

pub struct Schema<'a> {
    pub meta: &'a OrgMeta,
}

impl<'a> Render for Schema<'a> {
    fn render_to(&self, buffer: &mut String) {
        let value = object! {
            "@context": "http://schema.org",
            "@type": "BlogPosting",
            "url": format!("https://blog.poi.cat/amp{}", self.meta.slug),
            "name": "Solomon",
            "headline": format!("{}☆Solomon", self.meta.title),
            "description": "PoiScript's Blog",
            "mainEntityOfPage": "https://blog.poi.cat",
            "publisher": {
                "@type": "Organization",
                "name": "Solomon",
                "logo": {
                    "@type": "ImageObject",
                    "url": "https://blog.poi.cat/assets/amp-logo.jpg",
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
