import * as RSS from 'rss';
import { resolve } from 'url';

import { render } from './render';
import { blog as blogConfig } from '../solomon.conf';

const rss_pkg = require('rss/package');

export function rss (posts) {
  const feed = new RSS({
    title: blogConfig.title,
    description: blogConfig.description,
    generator: `node-rss ${rss_pkg.version}`,
    feed_url: resolve(blogConfig.url, 'atom.xml'),
    site_url: blogConfig.url,
    language: blogConfig.language
  });

  const POST_BASE = resolve(blogConfig.url, 'post/');
  posts.sort((a, b) => (a.date < b.date) ? 1 : ((a.date > b.date) ? -1 : 0))
    .forEach(post => feed.item({
      title: post.title,
      description: render(post),
      url: resolve(POST_BASE, post.slug),
      guid: post.slug,
      categories: post.tags,
      author: blogConfig.anchor,
      date: post.date
    }));

  return feed.xml();
}
