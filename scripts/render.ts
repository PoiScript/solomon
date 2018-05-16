import { readFileSync } from 'fs-extra';
import { minify } from 'html-minifier';
import * as marked from 'marked';
import { join, resolve } from 'path';

const content = resolve('apps/blog/content');
const renderer = new marked.Renderer();
const headings = [];

marked.setOptions({
  highlight: code => require('highlight.js').highlightAuto(code).value,
});

renderer.heading = text => {
  const id = encodeURI(text);
  headings.push({ id, text });
  return `</div></section><section id="${id}"><h2>${text}</h2><div class="section-content">`;
};

const toc = () => `
  <section class="toc">
    <h2>${headings.length ? 'Contents' : ''}</h2>
    <div class="section-content">
      <nav>
        <ul>
          ${headings.map(h => `<li>${h.text}</li>`).join('')}
        </ul>
      </nav>
`;

export function render(slug) {
  // clear headings array
  while (headings.length) {
    headings.pop();
  }

  const markdown = readFileSync(join(content, `${slug}.md`), 'utf8');
  const html = marked(markdown, { renderer }).concat('</div></section>');

  return minify(toc().concat(html), {
    collapseWhitespace: true,
    removeEmptyElements: true,
  });
}
