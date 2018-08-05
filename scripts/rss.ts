import * as RSS from 'rss';

const rss_pkg = require('rss/package');

export const rss = posts => {
  const feed = new RSS({
    title: 'solomon',
    description: "PoiScript's Blog",
    generator: `node-rss ${rss_pkg.version}`,
    feed_url: 'https://blog.poi.cat/atom.xml',
    site_url: 'https://blog.poi.cat',
    language: 'zh-Hans',
  });

  for (const post of posts) {
    feed.item({
      title: post.title,
      description: post.html,
      url: `https://blog.poi.cat/post/${post.slug}`,
      guid: post.slug,
      categories: post.tags,
      author: 'PoiScript',
      date: post.date,
    });
  }

  return feed.xml();
};
