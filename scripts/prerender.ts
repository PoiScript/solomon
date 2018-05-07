/* tslint:disable:no-console */

import 'zone.js/dist/zone-node';

import { enableProdMode } from '@angular/core';
import { renderModuleFactory } from '@angular/platform-server';
import { outputFileSync, readFileSync } from 'fs-extra';
import { join, resolve } from 'path';
import { minify } from 'html-minifier';

import { posts } from '../src/config';

const dist = resolve('dist');
const document = readFileSync(join(dist, 'index.html'), 'utf8');
const { AppServerModuleNgFactory } = require(join(dist, 'dist-server/main'));

enableProdMode();

const pages: { [key: string]: string } = {};

const pushPage = (url: string, path?: string) => {
  pages[url] = path ? path : join(url, 'index.html');
};

// add default pages
pushPage('/');
pushPage('/about');
pushPage('/link');
pushPage('/404', '/404.html');

for (const slug in posts) {
  if (posts.hasOwnProperty(slug)) {
    // add post page
    pushPage(`/post/${slug}`);

    for (const tag of posts[slug].tags) {
      // add tag page
      pushPage(`/tag/${tag}`);
    }
  }
}

// render
for (const [url, path] of Object.entries(pages)) {
  renderModuleFactory(AppServerModuleNgFactory, { url, document })
    .then(html =>
      minify(html, {
        collapseWhitespace: true,
        removeComments: true,
        minifyCSS: true,
      }),
    )
    .then(html => {
      console.info(`Saving "${url}" as "${path}"`);
      outputFileSync(join(dist, path), html);
    });
}
