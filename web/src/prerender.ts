/* tslint:disable:no-console */

import 'zone.js/dist/zone-node';

import { enableProdMode } from '@angular/core';
import { renderModuleFactory } from '@angular/platform-server';
import { outputFile, readFileSync, readJsonSync } from 'fs-extra';
import { resolve } from 'path';
import { minify } from 'html-minifier';

const posts = readJsonSync(resolve(__dirname, '../../assets/posts.json'));

const document = readFileSync(
  resolve(__dirname, '../dist/app/index.html'),
  'utf8',
);
const { AppServerModuleNgFactory } = require(resolve(
  __dirname,
  '../dist/server/main',
));

enableProdMode();

const pages = [
  ['/', 'index.html'],
  ['/about', 'about/index.html'],
  ['/link', 'link/index.html'],
  ['/404', '404.html'],
];

for (const post of posts) {
  pages.push([`/post/${post.slug}`, `post/${post.slug}/index.html`]);
}

Promise.all(
  pages.map(([url, path]) =>
    renderModuleFactory(AppServerModuleNgFactory, { url, document })
      .then(html =>
        minify(html, {
          collapseWhitespace: true,
          removeComments: true,
          minifyCSS: true,
        }),
      )
      .then(html => outputFile(resolve(__dirname, '../dist/app/', path), html)),
  ),
).then(res => console.log(`Pre-rendered ${res.length} files`));
