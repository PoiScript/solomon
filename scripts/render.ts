import chalk from 'chalk';
import { readFile } from 'fs-extra';
import { parse } from 'orga';
import { resolve } from 'path';
import * as sizeOf from 'image-size';
import * as Prism from 'prismjs/prism';
import * as loadLanguages from 'prismjs/components/index';

import { escapeHtml } from './util';

loadLanguages(['typescript', 'bash', 'lisp', 'yaml', 'http', 'rust']);

const handleCodeBlock = (code, params) => {
  const lang = params.length > 0 ? params[0].toLowerCase() : null;
  if (lang) {
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
  return lines.reduce((res, acc, index) => {
    const number = (index + 1).toString().padStart(padding);
    return `${res}<span class="line-number">${number}  </span>${acc}\n`;
  }, '');
};

const handleImageLink = (uri, desc) => {
  const { width, height } = sizeOf(
    resolve('apps/blog/content', uri.location.replace(/^\/+/g, '')),
  );
  const ratios = (height / width) * 100;
  const style =
    'background-image: url(' + uri.location + '); padding-top: ' + ratios + '%';

  return `<div class="image-container">
  <div class="image" style="${style}"></div>
</div>`;
};

export const renderHtml = node => {
  if (Array.isArray(node)) {
    return node.map(child => renderHtml(child)).join('');
  } else {
    let { type, children, name, value, uri, desc, ordered, params } = node;

    switch (type) {
      case 'root':
        return renderHtml(children);
      // inline
      case 'text':
        return escapeHtml(value);
      case 'bold':
        return `<b>${renderHtml(children)}</b>`;
      case 'underline':
        return `<u>${renderHtml(children)}</u>`;
      case 'strikeThrough':
        return `<s>${renderHtml(children)}</s>`;
      case 'code':
      case 'verbatim':
        return `<code>${renderHtml(children)}</code>`;
      case 'italic':
        return `<i>${renderHtml(children)}</i>`;
      case 'link': {
        switch (uri.protocol) {
          // image link
          case 'file':
            return handleImageLink(uri, desc);
          case 'http':
          case 'https':
            return `<a href="${uri.raw}">${desc ? desc : uri.raw}</a>`;
          default:
            console.error(`Unhandled protocol: ${chalk.red(uri.protocol)}`);
            return;
        }
      }
      // list
      case 'list': {
        const tag = ordered ? 'ol' : 'ul';
        return `<${tag}>${renderHtml(children)}</${tag}>`;
      }
      case 'list.item':
        return `<li>${renderHtml(children)}</li>`;
      // block
      case 'paragraph':
        return `<p>${renderHtml(children)}</p>`;
      case 'section':
        return `<section>${renderHtml(children)}</section>`;
      // TODO: different levels
      case 'headline':
        return `<h1>${renderHtml(children)}</h1>`;
      case 'horizontalRule':
        return `<hr/>`;
      case 'block': {
        switch (name) {
          case 'QUOTE': {
            children = parse(value).children;
            return `<blockquote>${renderHtml(children)}</blockquote>`;
          }
          case 'SRC':
            return `<pre><code>${handleCodeBlock(value, params)}</code></pre>`;
          default:
            console.error(`Unhandled block, name: ${chalk.red(name)}`);
            return;
        }
      }
      default:
        console.error(`Unhandled node, type: ${chalk.red(type)}`);
    }
  }
};

export const render = (path, file) => {
  path = resolve(path, file + '.org');

  return readFile(path, 'utf-8').then(content => {
    let ast = parse(content);

    if (ast.meta.slug !== file) {
      console.error(`Unmatched slug: ${chalk.red(path)}`);
    }

    ast.meta.tags = ast.meta.tags.split(' ');

    return { html: renderHtml(ast), ...ast.meta };
  });
};
