/* tslint:disable:no-console */

import { outputFile, outputJson } from 'fs-extra';
import { resolve } from 'path';

import { render } from './render';
import { rss } from './rss';
import { generateList, listOrgFiles, sortByDate } from './util';

const blogPublicDir = resolve('public/blog');
const blogContentDir = resolve('apps/blog/content');
const libreriaPublicDir = resolve('public/libreria');
const libreriaContentDir = resolve('apps/libreria/content');

const check = async (contentDir, outputDir) => {
  let posts = await Promise.all(
    listOrgFiles(contentDir).map(file => render(contentDir, file)),
  );

  posts = posts.sort(sortByDate);

  return [
    ...posts.map(post =>
      outputJson(resolve(outputDir, post.slug + '.json'), post),
    ),
    outputFile(resolve(outputDir, 'atom.xml'), rss(posts)),
    outputJson(resolve(outputDir, 'posts.json'), generateList(posts)),
  ];
};

check(blogContentDir, blogPublicDir).catch(e => console.log(e));
