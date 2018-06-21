/* tslint:disable:no-console */

import { existsSync, outputFile } from 'fs-extra';
import { join, resolve } from 'path';

import { posts } from '@solomon/blog/src/config';

import { rss } from './rss';
import { render } from './render';

const publicDir = resolve('public');

(async () => {
  const rssPath = join(publicDir, 'atom.xml');
  const promise = [];

  if (!existsSync(rssPath)) {
    promise.push(rss(posts).then(xml => outputFile(rssPath, xml)));
  }

  for (const slug in posts) {
    if (posts.hasOwnProperty(slug)) {
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
  } catch (e) {
    console.log(e);
  }
})();
