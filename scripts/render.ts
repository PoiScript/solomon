import { readFile } from 'fs-extra';
import { minify } from 'html-minifier';
import { resolve } from 'path';
import * as hljs from 'highlight.js';
import * as MarkdownIt from 'markdown-it';

import { markdown_it_latex } from './markdown-it-latex';

const renderer = new MarkdownIt({
  html: true,
  highlight: (code, lang) =>
    lang && hljs.getLanguage(lang) ? hljs.highlight(lang, code).value : '',
}).use(markdown_it_latex);

export const render = slug =>
  readFile(resolve('apps/blog/content', `${slug}.md`), 'utf8')
    .then(markdown => renderer.render(markdown))
    .then(html =>
      minify(html, {
        collapseWhitespace: true,
        removeEmptyElements: true,
      }),
    );
