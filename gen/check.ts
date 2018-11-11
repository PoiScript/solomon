/* tslint:disable:no-console */

import { outputFile, outputJson } from 'fs-extra';
import { resolve } from 'path';

import { render } from './render';
import { rss } from './rss';
import { addNextAndPriorPost, listOrgFiles, sortByDate } from './util';

const publicDir = resolve('public');
const postDir = resolve('content/post');

const check = async (contentDir, outputDir) => {
  let posts = await Promise.all(
    listOrgFiles(contentDir).map(file => render(contentDir, file)),
  );

  posts = addNextAndPriorPost(posts.sort(sortByDate));

  return [
    ...posts.map(post =>
      outputJson(resolve(outputDir, 'json', post.slug + '.json'), post),
    ),
    outputFile(resolve(outputDir, 'atom.xml'), rss(posts)),
    outputJson(
      resolve(outputDir, 'posts.json'),
      posts.map(({ title, slug, date, tags }) => ({ title, slug, date, tags })),
    ),
  ];
};

check(postDir, publicDir).catch(e => console.log(e));
