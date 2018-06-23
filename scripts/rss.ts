import * as RSS from 'rss';
import { resolve as url_resolve } from 'url';
import { resolve as path_resolve } from 'path';
import { outputFileSync, readFileSync } from 'fs-extra';

import { Post } from '@solomon/blog/src/app/models';
import { sortByDate } from './util';

const rss_pkg = require('rss/package');

export const rss = (posts: { [slug: string]: Post }, outputPath) => {
  const feed = new RSS({
    title: 'solomon',
    description: "PoiScript's Blog",
    generator: `node-rss ${rss_pkg.version}`,
    feed_url: 'https://blog.poi.cat/atom.xml',
    site_url: 'https://blog.poi.cat',
    language: 'zh-Hans',
  });

  const POST_BASE = url_resolve('https://blog.poi.cat', 'post');

  for (const post of Object.values(posts).sort(sortByDate)) {
    // This operation must be sync to must sure feed item is keeping the same order
    const html = readFileSync(
      path_resolve(outputPath, 'html', `${post.slug}.html`),
      'utf-8',
    );

    feed.item({
      title: post.title,
      description: html,
      url: url_resolve(POST_BASE, post.slug),
      guid: post.slug,
      categories: post.tags,
      author: 'PoiScript',
      date: post.date,
    });
  }

  outputFileSync(path_resolve(outputPath, 'atom.xml'), feed.xml());
  console.log(`Generated atom.xml in ${outputPath}.`);
};
