import manifest from "../../web/dist/manifest.json";

const base = import.meta.env.BASE_URL;
const main = manifest["src/main.ts"];

export const html = (ctx: wasm_bindgen.Context): Response => {
  return new Response(
    `<!DOCTYPE html>
<html lang="zh-Hans">
  <head>
    <meta charset="utf-8" />
    <meta name="description" content="PoiScript's Blog" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="application-name" content="solomon" />
    <meta name="theme-color" content="#673ab7" />
    <meta name="apple-mobile-web-app-title" content="solomon" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="black" />
    <link rel="apple-touch-icon" sizes="120x120" href="${base}favicon/touch-icon.png" />
    <link rel="shortcut icon" sizes="32x32" href="${base}favicon/favicon.ico" />
    <link rel="icon" sizes="192x192" href="${base}favicon/favicon-192x192.png" />
    <link rel="icon" sizes="any" type="image/svg+xml" href="${base}favicon/favicon.svg" />
    <meta name="wasm-head-start" content="" />
    ${ctx.get_head()}
    <meta name="wasm-head-end" content="" />
    <script type="module" crossorigin src="${base}${main.file}"></script>
    ${main.imports
      .map(
        (i) => `<link rel="modulepreload" href="${base}${manifest[i].file}">`
      )
      .join("")}
    ${main.css
      .map((i) => `<link rel="stylesheet" href="${base}${i}">`)
      .join("")}
  </head>
  <body class="root">
    ${ctx.get_body()}
  </body>
</html>`,
    {
      status: ctx.get_status(),
      headers: {
        "content-type": "text/html; charset=utf-8",
        "cache-control": "public, max-age=600", // 10 minutes
        "cf-cache-status": "MISS",
      },
    }
  );
};

export const amp = async (ctx: wasm_bindgen.Context): Promise<Response> => {
  return new Response(
    `<!DOCTYPE html>
<html ⚡ lang="zh-Hans">
  <head>
    <meta charset="utf-8" />
    ${ctx.get_head()}
    <meta name="description" content="PoiScript's Blog" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="application-name" content="solomon" />
    <meta name="theme-color" content="#673ab7" />
    <meta name="apple-mobile-web-app-title" content="solomon" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="black" />
    <link rel="apple-touch-icon" sizes="120x120" href="${base}favicon/touch-icon.png" />
    <link rel="shortcut icon" sizes="32x32" href="${base}favicon/favicon.ico" />
    <link rel="icon" sizes="192x192" href="${base}favicon/favicon-192x192.png" />
    <link rel="icon" sizes="any" type="image/svg+xml" href="${base}favicon/favicon.svg" />
    <script async src="https://cdn.ampproject.org/v0.js"></script>
    <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
    <style amp-custom>${(
      await Promise.all(main.css.map((c) => SOLOMON_KV.get(c)))
    ).join("")}</style>
  </head>
  <body class="root">
    ${ctx.get_body()}
  </body>
</html>`,
    {
      status: ctx.get_status(),
      headers: {
        "content-type": "text/html; charset=utf-8",
        "cache-control": "public, max-age=600", // 10 minutes
        "cf-cache-status": "MISS",
      },
    }
  );
};

export const rss = (ctx: wasm_bindgen.Context): Response => {
  return new Response(ctx.get_body(), {
    status: ctx.get_status(),
    headers: {
      "content-type": "text/xml; charset=utf-8",
      "cache-control": "public, max-age=86400", // 1 day
      "cf-cache-status": "MISS",
    },
  });
};

export const txt = (ctx: wasm_bindgen.Context): Response => {
  return new Response(ctx.get_body(), {
    status: ctx.get_status(),
    headers: {
      "content-type": "text/plain; charset=utf-8",
    },
  });
};
