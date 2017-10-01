import * as RSS from 'rss';
import { resolve } from 'url';

import { render } from './render';
import { SOLOMON_CONFIG } from '../solomon.conf';

const rss_pkg = require('rss/package');

export function rss (posts) {
  const feed = new RSS({
    title: SOLOMON_CONFIG.blog.title,
    description: SOLOMON_CONFIG.blog.description,
    generator: `node-rss ${rss_pkg.version}`,
    feed_url: resolve(SOLOMON_CONFIG.blog.url, 'atom.xml'),
    site_url: SOLOMON_CONFIG.blog.url,
    language: SOLOMON_CONFIG.blog.language
  });

  const POST_BASE = resolve(SOLOMON_CONFIG.blog.url, 'post/');
  posts.forEach(post => {
    feed.item({
      title: post.title,
      description: render(post),
      url: resolve(POST_BASE, post.slug),
      guid: post.slug,
      categories: post.tags,
      author: SOLOMON_CONFIG.blog.anchor,
      date: post.date
    });
  });

  return feed.xml();
}
