/* tslint:disable:no-console */

import 'zone.js/dist/zone-node';

import { enableProdMode } from '@angular/core';
import { renderModuleFactory } from '@angular/platform-server';
import { outputFile, readFileSync, readJsonSync } from 'fs-extra';
import { join, resolve } from 'path';
import { minify } from 'html-minifier';

const posts = readJsonSync('public/blog/posts.json');

const dist = resolve('dist');
const document = readFileSync(join(dist, 'blog', 'index.html'), 'utf8');
const { AppServerModuleNgFactory } = require(join(dist, 'blog-server/main'));

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

const promises = [];

// render
for (const [url, path] of Object.entries(pages)) {
  promises.push(
    renderModuleFactory(AppServerModuleNgFactory, { url, document })
      .then(html =>
        minify(html, {
          collapseWhitespace: true,
          removeComments: true,
          minifyCSS: true,
        }),
      )
      .then(html => outputFile(join(dist, 'blog', path), html)),
  );
}

Promise.all(promises).then(res =>
  console.log(`Pre-rendered ${res.length} files`),
);
