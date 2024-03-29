import Prism from "prismjs";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-lisp";
import "prismjs/components/prism-rust";
import "prismjs/components/prism-http";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-yaml";

import mime from "./mime";
import { html, rss, amp, txt } from "./response";

addEventListener("fetch", (event: FetchEvent) => {
  try {
    event.respondWith(handleRequest(event));
  } catch (e: any) {
    event.respondWith(new Response(e.toString(), { status: 500 }));
  }
});

async function handleRequest(event: FetchEvent): Promise<Response> {
  // @ts-ignore
  const cache = caches.default;
  const url = new URL(event.request.url).pathname;

  // cache
  {
    const response = await cache.match(event.request);

    if (response) {
      const headers = new Headers(response.headers);
      headers.set("cf-cache-status", "HIT");

      return new Response(response.body, {
        headers,
        status: response.status || 200,
        statusText: response.statusText || "OK",
      });
    }
  }

  // assets
  {
    // kv key cannot be empty
    if (url.length > 1) {
      const { value: buffer, metadata = {} } =
        await SOLOMON_KV.getWithMetadata<any>(url.substring(1), "arrayBuffer");

      if (buffer) {
        if (
          event.request.headers.has("if-none-match") &&
          event.request.headers.get("if-none-match") === metadata?.etag
        ) {
          return new Response(null, {
            status: 304,
            headers: {
              "content-type": mime(url),
              etag: metadata?.etag,
              "cf-cache-status": "MISS",
            },
          });
        }

        const cache_control =
          url.endsWith(".js") || url.endsWith(".css") || url.endsWith(".wasm")
            ? "public, max-age=31536000, immutable"
            : "public, no-cache";

        const response = new Response(buffer, {
          status: 200,
          headers: {
            "content-type": mime(url),
            etag: metadata?.etag,
            "cf-cache-status": "MISS",
            "cache-control": cache_control,
          },
        });

        event.waitUntil(cache.put(event.request, response.clone()));

        return response;
      }
    }
  }

  // wasm
  {
    WASM_BINDGEN_SCRIPT;

    await wasm_bindgen(SOLOMON_WSAM);

    let ctx = new wasm_bindgen.Context(import.meta.env.BASE_URL, {
      highlight: (code, lang) => {
        if (lang in Prism.languages) {
          return Prism.highlight(code, Prism.languages[lang], lang);
        }

        return code;
      },
    });
    ctx = await wasm_bindgen.render(url, ctx);

    let response: Response = null;

    switch (ctx.get_type()) {
      case "html": {
        response = html(ctx);
        break;
      }
      case "rss": {
        response = rss(ctx);
        break;
      }
      case "amp": {
        response = await amp(ctx);
        break;
      }
      case "txt": {
        response = txt(ctx);
        break;
      }
    }

    event.waitUntil(cache.put(event.request, response.clone()));

    return response;
  }
}
