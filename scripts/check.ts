/* tslint:disable:no-console */

import { existsSync, readJsonSync } from 'fs-extra';
import { resolve } from 'path';

import { render } from './render';
import { parseLatex } from './latex';
import { generateEntryMeta, generatePostMeta } from './meta';
import { rss } from './rss';

const blogPublicDir = resolve('public/blog');
const blogContentDir = resolve('apps/blog/content');
const libreriaPublicDir = resolve('public/libreria');
const libreriaContentDir = resolve('apps/libreria/content');

(async () => {
  let posts = {};
  // check if posts.json exists
  if (!existsSync(resolve(blogPublicDir, 'posts.json'))) {
    posts = await generatePostMeta();
  } else {
    posts = await readJsonSync(resolve(blogPublicDir, 'posts.json'));
  }
  let entries = {};
  if (!existsSync(resolve(blogPublicDir, 'entries.json'))) {
    entries = await generateEntryMeta();
  } else {
    entries = await readJsonSync(resolve(blogPublicDir, 'entries.json'));
  }

  const slugs = Object.keys(posts).filter(
    slug => !existsSync(resolve(blogPublicDir, 'html', `${slug}.html`)),
  );

  const entriesSlug = Object.keys(entries).filter(
    slug => !existsSync(resolve(libreriaPublicDir, 'html', `${slug}.html`)),
  );

  try {
    await render(slugs, blogPublicDir, blogContentDir);
    await render(entriesSlug, libreriaPublicDir, libreriaContentDir);
    await parseLatex();
    if (!existsSync(resolve(blogPublicDir, 'atom.xml'))) {
      rss(posts, blogPublicDir);
    }
  } catch (e) {
    console.log(e);
  }
})();
