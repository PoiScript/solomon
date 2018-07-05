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
      if (lang) {
        lang = lang.toLowerCase();

        // highlighting the code
        if (lang in Prism.languages) {
          code = Prism.highlight(code, Prism.languages[lang]);
        } else {
          console.error(`Not language definitions for ${chalk.red(lang)}`);
        }
      }

      // split into lines
      const lines = code.trim().split(/\r\n|\r|\n/);

      // line number is not necessary for code shorted than 4 lines
      if (lines.length < 4) return code;

      const padding = lines.length < 10 ? 1 : lines.length < 100 ? 2 : 3;

      // insert line number at the beginning
      return lines.reduce(
        (res, acc, index) =>
          `${res}<span class="line-number">${(index + 1)
            .toString()
            .padStart(padding)}  </span>${acc}\n`,
        '',
      );
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
