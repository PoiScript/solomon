#!/usr/bin/env zx

$.verbose = false;

const crypto = require("crypto");
const { FormData, fetch, File } = require("undici");
const sizeOf = require("image-size");
const assert = require("assert");

const { WORKER_NAME, CF_TOKEN, KV_NAMESPACE_ID, ACCOUNT_ID } = process.env;

assert.ok(
  WORKER_NAME && CF_TOKEN && KV_NAMESPACE_ID && ACCOUNT_ID,
  "`WORKER_NAME`, `CF_TOKEN` `KV_NAMESPACE_ID`, `ACCOUNT_ID` is not present."
);

// create org-meta.json
{
  console.log(`Creating org-meta.json...`);

  const paths = await globby("public/**/*.org");

  const items = {};

  for (const path of paths) {
    const content = await fs.readFile(path, "utf-8");
    const slug = path.slice("public".length, -4);

    items[slug] = { slug };

    for (const line of content.split("\n")) {
      const [key, val = ""] = line.split(": ");
      if (key.startsWith("#+TITLE")) {
        items[slug].title = val;
      }
      if (key.startsWith("#+PUBLISHED")) {
        items[slug].published = new Date(val).getTime();
      }
      if (key.startsWith("#+TAGS")) {
        items[slug].tags = val.split(/\s/).filter(Boolean);
      }
    }
  }

  await fs.writeFile("public/org-meta.json", JSON.stringify(items, null, 2));
}

// create img-meta.json
{
  console.log(`Creating img-meta.json...`);

  const paths = await globby("public/images/*");

  const items = {};

  for (const path of paths) {
    const { width, height } = sizeOf(path);
    const slug = path.slice("public".length);
    items[slug] = { slug, width, height };
  }

  await fs.writeFile("public/img-meta.json", JSON.stringify(items, null, 2));
}

// upload assets to both s3 and cloudflare kv
{
  console.log(`Building web...`);

  await $`yarn --cwd wasm build:web`;
  await $`yarn --cwd web build`;

  const paths = await globby("web/dist/**");

  console.log(`Writing cloudflare kv pairs...`);

  const body = [];

  for (const path of paths) {
    const key = path.slice("web/dist/".length);
    const value = await fs.readFile(path, { encoding: "base64" });

    const hash = crypto
      .createHash("sha1")
      .update(value, "utf8")
      .digest("base64")
      .substring(0, 27);

    const etag = '"' + hash.length.toString(16) + "-" + hash + '"';

    body.push({
      key,
      value,
      base64: true,
      metadata: { etag },
    });
  }

  const res = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/storage/kv/namespaces/${KV_NAMESPACE_ID}/bulk`,
    {
      method: "PUT",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${CF_TOKEN}`,
      },
    }
  );

  if (!res.ok) throw new Error(await res.text());
}

{
  console.log(`Building cloudflare worker...`);

  await $`yarn --cwd wasm build:worker`;
  await $`yarn --cwd worker build`;

  console.log(`Uploading to cloudflare worker...`);

  const form = new FormData();

  form.append(
    "metadata",
    new File([
      JSON.stringify({
        bindings: [
          {
            name: "SOLOMON_WSAM",
            part: "solomon_bg",
            type: "wasm_module",
          },
          {
            name: "SOLOMON_KV",
            namespace_id: KV_NAMESPACE_ID,
            type: "kv_namespace",
          },
        ],
        body_part: "script",
      }),
    ]),
    "metadata.json"
  );

  form.append(
    "script",
    new File([await fs.readFile("./worker/dist/main.js")]),
    "main.js"
  );

  form.append(
    "solomon_bg",
    new File([await fs.readFile("./worker/pkg/solomon_bg.wasm")]),
    "main.js"
  );

  const res = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/workers/scripts/${WORKER_NAME}`,
    {
      method: "PUT",
      body: form,
      headers: {
        authorization: `Bearer ${CF_TOKEN}`,
      },
    }
  );

  if (!res.ok) throw new Error(await res.text());
}
