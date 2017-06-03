import * as RSS from 'rss';
import {existsSync, mkdirSync, writeFile} from 'fs';

import {parse} from './render';
import {Post} from 'app/app.types';

const OUTPUT_DIR = 'dist';
const BLOG_TITLE = 'Solomon';
const BLOG_DESCRIPTION = 'PoiScript\'s Blog';
const BLOG_URL = 'https://poi.works';
const BLOG_LANGUAGE = 'zh-Hans';

if (!existsSync(OUTPUT_DIR)) {
  mkdirSync(OUTPUT_DIR);
}

const feed = new RSS({
  title: BLOG_TITLE,
  description: BLOG_DESCRIPTION,
  generator: 'node-rss 1.2.2',
  feed_url: `${BLOG_URL}/atom.xml`,
  site_url: BLOG_URL,
  language: BLOG_LANGUAGE
});

const posts: Post[] = parse();

posts
  .filter(post => post.slug !== 'about')
  .forEach(post => {
    feed.item({
      title: post.title,
      description: post.summary,
      url: `${BLOG_URL}/post/${post.slug}`,
      guid: post.slug,
      categories: post.tags,
      author: 'PoiScript',
      date: post.date
    });
  });

writeFile(`${OUTPUT_DIR}/atom.xml`, feed.xml({indent: true}), (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log('[GENERATED] atom.xml');
  }
});
