import * as RSS from 'rss';
const rss_pkg = require('rss/package');
import { resolve } from 'url';

import { PostDict } from '@solomon/blog/src/app/models';

import { render } from './render';
import { sortByDate } from './util';

export const rss = (posts: PostDict) => {
  const feed = new RSS({
    title: 'solomon',
    description: "PoiScript's Blog",
    generator: `node-rss ${rss_pkg.version}`,
    feed_url: 'https://blog.poi.cat/atom.xml',
    site_url: 'https://blog.poi.cat',
    language: 'zh-Hans',
  });

  const POST_BASE = resolve('https://blog.poi.cat', 'post');
  const promise = [];

  Object.values(posts)
    .sort(sortByDate)
    .forEach(post =>
      promise.push(
        render(post.slug).then(html => {
          feed.item({
            title: post.title,
            description: html,
            url: resolve(POST_BASE, post.slug),
            guid: post.slug,
            categories: post.tags,
            author: 'PoiScript',
            date: post.date,
          });
        }),
      ),
    );

  return Promise.all(promise).then(() => feed.xml());
};
