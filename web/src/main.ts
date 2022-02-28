import Prism from "prismjs";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-lisp";
import "prismjs/components/prism-rust";
import "prismjs/components/prism-http";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-yaml";

import init, { render, Context } from "../pkg";

import "prismjs/themes/prism.css";
import "./index.less";
import { showProgress, hideProgress } from "./progress";

const updateHead = (head: string) => {
  const start = document.querySelector('meta[name="wasm-head-start"]');
  const end = document.querySelector('meta[name="wasm-head-end"]');

  if (!start || !end) {
    console.error(
      'meta[name="wasm-head-start"] or meta[name="wasm-head-end"] not found'
    );
    return;
  }

  let el = start.nextElementSibling;
  while (el && el !== end) {
    let next = el.nextElementSibling;
    el.remove();
    el = next;
  }

  const wrapper = document.createElement("div");
  wrapper.innerHTML = head;
  [...wrapper.children].forEach((child) => {
    start.insertAdjacentElement("afterend", child);
  });
};

const updatePage = async (url: string, ctx: Context): Promise<Context> => {
  showProgress();
  ctx = await render(url, ctx);
  updateHead(ctx.get_head());
  hideProgress();
  document.body.innerHTML = ctx.get_body();
  window.scrollTo({ top: 0, behavior: "smooth" });
  return ctx;
};

const main = async () => {
  await init();
  let ctx = new Context(import.meta.env.BASE_URL, {
    highlight: (code, lang) => {
      if (lang in Prism.languages) {
        return Prism.highlight(code, Prism.languages[lang], lang);
      }

      return code;
    },
  });

  console.log(ctx.get_version());

  if (import.meta.env.DEV) {
    ctx = await updatePage(location.pathname, ctx);
  }

  let previousUrl = location.pathname;

  document.addEventListener("click", async (event) => {
    if (!(event.target instanceof Element)) return null;

    const anchor = event.target.closest<HTMLAnchorElement>(
      "a[data-router][href]"
    );

    if (!anchor) return;

    const newUrl = new URL(anchor.href);

    // external links
    if (newUrl.hostname && newUrl.hostname !== location.hostname) return;

    // prevent reload
    event.preventDefault();

    // current url
    if (newUrl.pathname !== previousUrl) {
      previousUrl = newUrl.pathname;
      console.log("pushState:", newUrl.pathname);

      window.history.pushState(null, "", newUrl.pathname);
      ctx = await updatePage(newUrl.pathname, ctx);
    }
  });

  // back or forward buttons are clicked
  window.addEventListener("popstate", async () => {
    if (previousUrl !== location.pathname) {
      previousUrl = location.pathname;
      console.log("popState:", location.pathname);

      ctx = await updatePage(location.pathname, ctx);
    }
  });
};

Prism.highlightAll();

console.time("init");

main()
  .catch(console.error)
  .finally(() => console.timeEnd("init"));
