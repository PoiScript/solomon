use chrono::serde::{ts_milliseconds, ts_milliseconds_option};
use chrono::{DateTime, Utc};
use maud::Markup;
use serde::{Deserialize, Serialize};
use std::collections::HashMap;
use wasm_bindgen::prelude::*;
use wasm_bindgen_futures::JsFuture;

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

#[wasm_bindgen]
pub struct Context {
    pub(crate) url: String,

    pub(crate) base_url: String,

    pub(crate) content: Content,

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
    pub fn new(url: String, base_url: String) -> Context {
        Context {
            url,
            base_url,
            content: Content::Txt {
                status: 404,
                body: String::new(),
            },
            org_meta: HashMap::new(),
            img_meta: HashMap::new(),
        }
    }

    #[wasm_bindgen]
    pub fn set_url(&mut self, url: String) {
        self.url = url;
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
        format!(
            "Solomon {} ({}): {}",
            env!("CARGO_PKG_VERSION"),
            env!("CARGO_GIT_HASH"),
            env!("CARGO_BUILD_TIME")
        )
    }
}

impl Context {
    pub async fn load_org(&self, file: &str) -> Result<String, JsValue> {
        let url = format!("{}.org", file.trim_start_matches('/'));

        let text = self.load(&url).await?;

        return Ok(text);
    }

    pub async fn load_org_meta(&mut self) -> Result<(), JsValue> {
        if !self.org_meta.is_empty() {
            return Ok(());
        }

        let text = self.load("org-meta.json").await?;

        self.org_meta =
            serde_json::from_str(&text).map_err(|err| JsValue::from_str(&format!("{}", err)))?;

        Ok(())
    }

    pub async fn load_img_meta(&mut self) -> Result<(), JsValue> {
        if !self.img_meta.is_empty() {
            return Ok(());
        }

        let text = self.load("img-meta.json").await?;

        self.img_meta =
            serde_json::from_str(&text).map_err(|err| JsValue::from_str(&format!("{}", err)))?;

        Ok(())
    }

    async fn load(&self, path: &str) -> Result<String, JsValue> {
        cfg_if::cfg_if! {
            if #[cfg(feature = "workers")] {
                use js_sys::Promise;

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
                use web_sys::Response;

                let window = web_sys::window().unwrap();

                let url = format!("{}{}", self.base_url, path);

                let response = JsFuture::from(window.fetch_with_str(&url)).await?;

                assert!(response.is_instance_of::<Response>());

                let response: Response = response.dyn_into().unwrap();

                let text = JsFuture::from(response.text()?).await?;

                let text = text.as_string().unwrap();

                Ok(text)
            }
        }
    }
}
