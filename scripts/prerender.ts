/* tslint:disable:no-console */

import 'zone.js/dist/zone-node';
import 'reflect-metadata';

import { renderModuleFactory } from '@angular/platform-server';
import { readFileSync, outputFileSync } from 'fs-extra';
import { join, resolve } from 'path';
import { minify } from 'html-minifier';
import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';

import { SOLOMON_CONFIG } from '../solomon.conf';

const dist = resolve('dist');
const index = readFileSync(join(dist, 'index.html'), 'utf8');

const {AppServerModuleNgFactory, LAZY_MODULE_MAP} = require(join(dist, 'dist-server/main.bundle'));

const urls = ['/', '/about', '/link', '/user/login', '/user/action'];

SOLOMON_CONFIG.posts
  .forEach(post => {
    urls.push(join('/post', post.slug));
    post.tags.map(tag => urls.push(join('/slug', tag)));
  });

urls
  .filter((url, i, self) => self.indexOf(url) === i)
  .forEach(url => renderToStatic(url, join(dist, url, 'index.html')));

renderToStatic('/404', join(dist, '404.html'));

function renderToStatic (url, path) {
  renderModuleFactory(AppServerModuleNgFactory, {
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
