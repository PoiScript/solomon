import { readFile, outputFile } from 'fs-extra';
import { minify } from 'html-minifier';
import { resolve } from 'path';
import * as hljs from 'highlight.js';
import * as MarkdownIt from 'markdown-it';

import { markdown_it_latex } from './markdown-it-latex';
import { MetaRegex } from './util';

export const render = (slugs, outputPath, contentPath) => {
  const promises = [];

  const renderer = new MarkdownIt({
    html: true,
    highlight: (code, lang) =>
      lang && hljs.getLanguage(lang) ? hljs.highlight(lang, code).value : '',
  }).use(markdown_it_latex, { path: outputPath });

  for (const slug of slugs) {
    promises.push(
      readFile(resolve(contentPath, `${slug}.md`), 'utf8')
        .then(markdown => markdown.replace(MetaRegex, ''))
        .then(markdown => renderer.render(markdown))
        .then(html =>
          minify(html, {
            collapseWhitespace: true,
            removeEmptyElements: true,
          }),
        )
        .then(html =>
          outputFile(resolve(outputPath, 'html', `${slug}.html`), html),
        ),
    );
  }

  return Promise.all(promises).then(res => {
    if (res.length > 0) {
      console.log(`Generated ${res.length} html file(s) in ${outputPath}/html.`);
    }
  });
};
