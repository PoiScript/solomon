import { readFile } from 'fs-extra';
import { minify } from 'html-minifier';
import { resolve } from 'path';
import * as hljs from 'highlight.js';
import * as MarkdownIt from 'markdown-it';

const renderer = new MarkdownIt({
  html: true,
  highlight: (code, lang) =>
    lang && hljs.getLanguage(lang) ? hljs.highlight(lang, code).value : '',
});

export const render = slug =>
  readFile(resolve('apps/blog/content', `${slug}.md`), 'utf8')
    .then(markdown => renderer.render(markdown))
    .then(html =>
      minify(html, {
        collapseWhitespace: true,
        removeEmptyElements: true,
      }),
    );
