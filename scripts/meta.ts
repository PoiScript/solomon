import { outputJson, readdirSync, readFile, statSync } from 'fs-extra';
import { resolve } from 'path';
import { safeLoad } from 'js-yaml';

import { sortByDate, MetaRegex } from './util';

const parseYaml = yaml =>
  new Promise((resolve, reject) => {
    try {
      resolve(safeLoad(yaml));
    } catch (e) {
      console.error(e);
      reject(e);
    }
  });

const walk = (dir, list = []) => {
  const files = readdirSync(dir);
  for (const file of files) {
    const path = resolve(dir, file);
    if (statSync(path).isDirectory()) {
      walk(path, list);
    } else if (file.match(/\.md$/)) {
      list.push(path);
    }
  }
  return list;
};

const meta = async path => {
  const markdown = await readFile(path, 'utf-8');
  const match = MetaRegex.exec(markdown);

  if (!match) throw Error(`Not Metadata found in ${path}`);

  return parseYaml(match[0].slice(7 /* ```yaml */, -3 /* ``` */));
};

(async () => {
  const promises = [];
  const postMeta = { _length: 0, posts: {} };
  const entryMeta = { _length: 0, entries: {} };

  for (const path of walk('apps/blog/content')) {
    promises.push(meta(path));
  }

  const posts = (await Promise.all(promises)).sort(sortByDate);
  for (let i = 0; i < posts.length; i++) {
    let post = posts[i];
    if (i !== 0) {
      post.prior = {
        title: posts[i - 1].title,
        slug: posts[i - 1].slug,
      };
    }
    if (i !== posts.length - 1) {
      post.next = {
        title: posts[i + 1].title,
        slug: posts[i + 1].slug,
      };
    }
    postMeta.posts[post.slug] = post;
  }
  postMeta._length = posts.length;

  await Promise.all([
    outputJson('public/posts.json', postMeta),
    outputJson('public/entries.json', entryMeta),
  ]);
})().catch(e => console.error(e));
