use chrono::serde::{ts_milliseconds, ts_milliseconds_option};
use chrono::{DateTime, Utc};
use maud::Markup;
use serde::{Deserialize, Serialize};
use std::collections::HashMap;
use wasm_bindgen::prelude::*;

#[derive(Debug, Serialize, Deserialize)]
pub struct OrgMeta {
    /// slug, including leading slash ('/')
    pub slug: String,
    pub title: String,
    #[serde(with = "ts_milliseconds")]
    pub published: DateTime<Utc>,
    #[serde(default, with = "ts_milliseconds_option")]
    pub updated: Option<DateTime<Utc>>,
    pub tags: Vec<String>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct ImgMeta {
    pub slug: String,
    pub width: u32,
    pub height: u32,
}

#[wasm_bindgen(typescript_custom_section)]
const HIGHLIGHTER_STYLE: &'static str = r#"
interface Highlighter {
    highlight(code: string, lang: string): string;
}
"#;

#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(typescript_type = "Highlighter")]
    pub type Highlighter;

    #[wasm_bindgen(method)]
    pub fn highlight(this: &Highlighter, code: &str, lang: &str) -> String;
}

#[wasm_bindgen]
pub struct Context {
    /// base url, not including trailing slash ('/')
    pub(crate) base_url: String,

    pub(crate) content: Content,

    pub(crate) highlighter: Highlighter,

    pub(crate) org_meta: HashMap<String, OrgMeta>,
    pub(crate) img_meta: HashMap<String, ImgMeta>,
}

pub enum Content {
    Txt {
        status: u32,
        body: String,
    },
    Amp {
        status: u32,
        head: Markup,
        body: Markup,
    },
    Html {
        status: u32,
        head: Markup,
        body: Markup,
    },
    Rss {
        status: u32,
        body: Markup,
    },
}

#[wasm_bindgen]
impl Context {
    #[wasm_bindgen(constructor)]
    pub fn new(mut base_url: String, highlighter: Highlighter) -> Context {
        // trim String in place
        let len = base_url.trim_end_matches('/').len();
        base_url.truncate(len);

        Context {
            base_url,
            highlighter,
            content: Content::Txt {
                status: 404,
                body: String::new(),
            },
            org_meta: HashMap::new(),
            img_meta: HashMap::new(),
        }
    }

    #[wasm_bindgen]
    pub fn get_type(&self) -> String {
        match self.content {
            Content::Txt { .. } => "txt",
            Content::Amp { .. } => "amp",
            Content::Html { .. } => "html",
            Content::Rss { .. } => "rss",
        }
        .into()
    }

    #[wasm_bindgen]
    pub fn get_status(&self) -> u32 {
        match self.content {
            Content::Amp { status, .. } => status,
            Content::Html { status, .. } => status,
            Content::Rss { status, .. } => status,
            Content::Txt { status, .. } => status,
        }
    }

    #[wasm_bindgen]
    pub fn get_head(&self) -> Option<String> {
        match &self.content {
            Content::Amp { head, .. } => Some(head.0.clone()),
            Content::Html { head, .. } => Some(head.0.clone()),
            _ => None,
        }
    }

    #[wasm_bindgen]
    pub fn get_body(&self) -> Option<String> {
        match &self.content {
            Content::Amp { body, .. } => Some(body.0.clone()),
            Content::Html { body, .. } => Some(body.0.clone()),
            Content::Rss { body, .. } => Some(body.0.clone()),
            Content::Txt { body, .. } => Some(body.clone()),
        }
    }

    #[wasm_bindgen]
    pub fn get_version(&self) -> String {
        concat!(
            "Solomon ",
            env!("CARGO_PKG_VERSION"),
            " (",
            env!("CARGO_GIT_HASH"),
            "): ",
            env!("CARGO_BUILD_TIME")
        )
        .into()
    }
}

impl Context {
    pub fn find_prev_and_next(&self, date: &DateTime<Utc>) -> (Option<&OrgMeta>, Option<&OrgMeta>) {
        (
            self.org_meta
                .values()
                .filter(|org| org.slug.starts_with("/post/") && org.published < *date)
                .min_by(|a, b| b.published.cmp(&a.published)),
            self.org_meta
                .values()
                .filter(|org| org.slug.starts_with("/post/") && org.published > *date)
                .min_by(|a, b| b.published.cmp(&a.published)),
        )
    }

    pub async fn load_org(&self, slug: &str) -> Result<String, JsValue> {
        let url = format!("{}.org", slug.trim_start_matches('/'));

        let text = self.load(&url).await?;

        Ok(text)
    }

    pub async fn load_org_meta(&mut self) -> Result<(), JsValue> {
        if !self.org_meta.is_empty() {
            return Ok(());
        }

        let text = self.load("org-meta.json").await?;

        self.org_meta = serde_json::from_str(&text)
            .map_err(|err| JsValue::from_str(&format!("seder error: {}", err)))?;

        Ok(())
    }

    pub async fn load_img_meta(&mut self) -> Result<(), JsValue> {
        if !self.img_meta.is_empty() {
            return Ok(());
        }

        let text = self.load("img-meta.json").await?;

        self.img_meta = serde_json::from_str(&text)
            .map_err(|err| JsValue::from_str(&format!("seder error: {}", err)))?;

        Ok(())
    }

    async fn load(&self, path: &str) -> Result<String, JsValue> {
        if cfg!(feature = "worker") {
            #[wasm_bindgen]
            extern "C" {
                #[wasm_bindgen(catch, js_namespace = SOLOMON_KV, js_name = "get")]
                async fn kv_get(key: &str) -> Result<JsValue, JsValue>;
            }

            let text = kv_get(path).await?;

            let text = text.as_string().unwrap();

            Ok(text)
        } else {
            use wasm_bindgen::JsCast;
            use wasm_bindgen_futures::JsFuture;
            use web_sys::Response;

            let window = web_sys::window().unwrap();

            let url = format!("{}/{}", self.base_url, path);

            let response = JsFuture::from(window.fetch_with_str(&url)).await?;

            assert!(response.is_instance_of::<Response>());

            let response: Response = response.dyn_into().unwrap();

            let text = JsFuture::from(response.text()?).await?;

            let text = text.as_string().unwrap();

            Ok(text)
        }
    }
}
