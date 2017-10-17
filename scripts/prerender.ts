/* tslint:disable:no-console */

import 'zone.js/dist/zone-node';
import 'reflect-metadata';

import { renderModuleFactory } from '@angular/platform-server';
import { outputFileSync, readFileSync } from 'fs-extra';
import { join, resolve } from 'path';
import { minify } from 'html-minifier';
import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';

import { startServer, stopServer } from './server';
import { posts } from '../solomon.conf';

const dist = resolve('dist');
const index = readFileSync(join(dist, 'index.html'), 'utf8');
const urls = ['/', '/about', '/link', '/user/login', '/user/action'];
const {AppServerModuleNgFactory, LAZY_MODULE_MAP} = require(join(dist, 'dist-server/main.bundle'));

function renderToStatic (url, path) {
  return renderModuleFactory(AppServerModuleNgFactory, {
    url: url,
    document: index,
    extraProviders: [provideModuleMap(LAZY_MODULE_MAP)]
  }).then(html => minify(html, {
    collapseWhitespace: true,
    removeComments: true,
    minifyCSS: true
  }))
    .then(html => {
      console.info(`Saving "${url}" as "${path}"`);
      outputFileSync(path, html);
    });
}

posts
  .forEach(post => {
    urls.push(join('/post', post.slug));
    post.tags.map(tag => urls.push(join('/slug', tag)));
  });

const promises = [];

startServer(8080);

urls
  .filter((url, i, self) => self.indexOf(url) === i)
  .forEach(url => promises.push(renderToStatic(url, join(dist, url, 'index.html'))));

promises.push(renderToStatic('/post/hello-world', join(dist, '404.html')));

// stop server when all promise is resolved
Promise.all(promises).then(() => stopServer());
