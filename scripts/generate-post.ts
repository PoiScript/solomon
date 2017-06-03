import {existsSync, mkdirSync, writeFile} from 'fs';

import {parse} from './render';
import {Post} from 'app/app.types';

const XHR_PATH = '/assets/html';
const HTML_OUTPUT_DIR = 'src/assets/html';
const JSON_OUTPUT_DIR = 'src/assets/json';

const posts: Post[] = parse();

posts.forEach(post => {
  if (!existsSync(HTML_OUTPUT_DIR)) {
    mkdirSync(HTML_OUTPUT_DIR);
  }

  writeFile(`${HTML_OUTPUT_DIR}/${post.slug}.html`, post.html, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log(`[GENERATED] ${post.slug}.html`);
    }
  });

  post.html = `${XHR_PATH}/${post.slug}.html`;
});

if (!existsSync(JSON_OUTPUT_DIR)) {
  mkdirSync(JSON_OUTPUT_DIR);
}

writeFile(`${JSON_OUTPUT_DIR}/post.json`,
  JSON.stringify(posts.filter(post => post.slug !== 'about')),
  (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log(`[GENERATED] post.json`);
    }
  });
