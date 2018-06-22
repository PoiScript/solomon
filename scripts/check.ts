/* tslint:disable:no-console */

import { existsSync, outputFile, readJsonSync } from 'fs-extra';
import { join, resolve } from 'path';

const posts = readJsonSync('public/posts.json');

import { rss } from './rss';
import { render } from './render';
import { optimize } from './optimize';

const publicDir = resolve('public');
export let ltximgs = {};
try {
  ltximgs = readJsonSync('public/ltximg/ltximg.json');
} catch (e) {}

(async () => {
  const rssPath = join(publicDir, 'atom.xml');
  const promise = [];

  if (!existsSync(rssPath)) {
    promise.push(rss(posts.posts).then(xml => outputFile(rssPath, xml)));
  }

  for (const slug in posts.posts) {
    if (posts.posts.hasOwnProperty(slug)) {
      const path = join(publicDir, 'html', `${slug}.html`);
      if (!existsSync(path)) {
        promise.push(render(slug).then(html => outputFile(path, html)));
      }
    }
  }

  try {
    const res = await Promise.all(promise);
    if (res.length > 0) {
      console.log(`Generated ${res.length} files.`);
    }
    await optimize(ltximgs);
  } catch (e) {
    console.log(e);
  }
})();
