import {existsSync, mkdirSync, writeFile} from 'fs';

import {parse} from './render';
import {Post} from '../main/src/app/app.types';

const XHR_PATH = '/assets/html';
const NG_HTML_OUTPUT_DIR = 'main/src/assets/html';
const NG_JSON_OUTPUT_DIR = 'main/src/assets/json';

const posts: Post[] = parse();

posts.forEach(post => {
  if (!existsSync(NG_HTML_OUTPUT_DIR)) {
    mkdirSync(NG_HTML_OUTPUT_DIR);
  }

  writeFile(`${NG_HTML_OUTPUT_DIR}/${post.slug}.html`, post.html, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log(`[GENERATED] ${post.slug}.html`);
    }
  });

  post.html = `${XHR_PATH}/${post.slug}.html`;
});

if (!existsSync(NG_JSON_OUTPUT_DIR)) {
  mkdirSync(NG_JSON_OUTPUT_DIR);
}

writeFile(`${NG_JSON_OUTPUT_DIR}/post.json`,
  JSON.stringify(posts.filter(post => post.slug !== 'about')),
  (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log(`[GENERATED] post.json`);
    }
  });
