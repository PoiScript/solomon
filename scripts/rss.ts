import RSS = require('rss');

import {Post} from '../src/app/class/post';

const feed = new RSS({
  title: 'Solomon',
  description: 'PoiScript\'s Blog',
  generator: 'Node-RSS',
  feed_url: 'https://poi.works/atom.xml',
  site_url: 'https://poi.works',
  managingEditor: 'PoiScript',
  webMaster: 'PoiScript',
  language: 'zh-Hans'
});

export function addFeedItem (posts: Post[]) {
  posts.forEach(post => {
    feed.item({
      title: post.intro.title,
      description: 'A Post From Solomon',
      url: `https://poi.works/posts/${post.intro.slug}`,
      guid: post.intro.slug,
      categories: post.intro.tags,
      author: 'PoiScript',
      date: post.intro.date
    });
  });
}

export function extraXml (): string {
  return feed.xml({indent: true});
}
