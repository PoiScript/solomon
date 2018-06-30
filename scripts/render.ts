import chalk from 'chalk';
import { readFile, outputFile } from 'fs-extra';
import { minify } from 'html-minifier';
import { resolve } from 'path';
import * as Prism from 'prismjs/prism';
import * as loadLanguages from 'prismjs/components/index';
import * as MarkdownIt from 'markdown-it';

import { markdown_it_latex } from './markdown-it-latex';
import { MetaRegex } from './util';

loadLanguages(['typescript', 'bash', 'lisp', 'yaml', 'http']);

export const render = (slugs, outputPath, contentPath) => {
  const promises = [];

  const renderer = new MarkdownIt({
    html: true,
    highlight: (code, lang) => {
      if (!lang) return '';

      lang = lang.toLowerCase();

      if (!(lang in Prism.languages)) {
        console.error(`Not language definitions for ${chalk.red(lang)}`);
        return '';
      } else {
        return Prism.highlight(code, Prism.languages[lang]);
      }
    },
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
    const len = res.length;
    if (len > 0) {
      console.log(`Generated ${len} html file(s) in ${outputPath}/html.`);
    }
  });
};
