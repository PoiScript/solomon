/* tslint:disable:no-console */

import { existsSync, outputFileSync } from 'fs-extra';
import { join, resolve } from 'path';

import { rss } from './rss';
import { render } from './render';
import { posts } from '../src/config';

const publicDir = resolve('public');

if (!existsSync(join(publicDir, 'atom.xml'))) {
  console.info(`INFO: atom.xml doesn't exist, creating...`);
  outputFileSync(join(publicDir, 'atom.xml'), rss(posts));
}

posts
  .filter(post => !existsSync(join(publicDir, 'html', `${post.slug}.html`)))
  .map(post => {
    console.info(`INFO: ${post.slug}.html doesn't exist, creating...`);
    outputFileSync(join(publicDir, `html/${post.slug}.html`), render(post));
  });
