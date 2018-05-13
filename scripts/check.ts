/* tslint:disable:no-console */

import { existsSync, outputFileSync } from 'fs-extra';
import { join, resolve } from 'path';

import { posts } from '@solomon/blog/src/config'

import { rss } from './rss';
import { render } from './render';

const publicDir = resolve('public');

if (!existsSync(join(publicDir, 'atom.xml'))) {
  console.info(`INFO: atom.xml doesn't exist, creating...`);
  outputFileSync(join(publicDir, 'atom.xml'), rss(posts));
}

for (const slug in posts) {
  if (posts.hasOwnProperty(slug)) {
    const path = join(publicDir, 'html', `${slug}.html`);
    if (!existsSync(path)) {
      console.info(`INFO: ${slug}.html doesn't exist, creating...`);
      outputFileSync(path, render(slug));
    }
  }
}
