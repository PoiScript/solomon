import RSS = require('rss');

import {Post} from '../src/app/shared/post';

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
  posts
    .map(post => post.intro)
    .filter(intro => intro.slug !== 'about')
    .sort((i1, i2) => Date.parse(i2.date) - Date.parse(i1.date))
    .forEach(intro => {
      feed.item({
        title: intro.title,
        description: 'A Post From Solomon',
        url: `https://poi.works/post/${intro.slug}`,
        guid: intro.slug,
        categories: intro.tags,
        author: 'PoiScript',
        date: intro.date
      });
    });
}

export function extraXml (): string {
  return feed.xml({indent: true});
}
