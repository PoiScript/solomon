/* tslint:disable:no-console */

import { existsSync, outputFileSync } from 'fs-extra';
import { join, resolve } from 'path';

import { rss } from './rss';
import { render } from './render';
import { SOLOMON_CONFIG } from '../solomon.conf';

const assets = resolve('assets');

if (!existsSync(join(assets, 'atom.xml'))) {
  console.info(`INFO: atom.xml doesn't exist, creating...`);
  outputFileSync(
    join(assets, 'atom.xml'),
    rss(SOLOMON_CONFIG.posts.sort((a, b) => (a.date < b.date) ? 1 : ((a.date > b.date) ? -1 : 0)))
  );
}

SOLOMON_CONFIG.posts
  .filter(post => !existsSync(join(assets, 'html', `${post.slug}.html`)))
  .map(post => {
    console.info(`INFO: ${post.slug}.html doesn't exist, creating...`);
    outputFileSync(join(assets, 'html', `${post.slug}.html`), render(post));
  });
