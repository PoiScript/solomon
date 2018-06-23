/* tslint:disable:no-console */

import { existsSync, readJsonSync } from 'fs-extra';
import { resolve } from 'path';

import { render } from './render';
import { optimizeSvg, parseLatex, saveJson } from './latex';
import { generatePostMeta } from './meta';
import { rss } from './rss';

const blogPublicDir = resolve('public/blog');
const blogContentDir = resolve('apps/blog/content');

(async () => {
  let posts = {};
  // check if posts.json exists
  if (!existsSync(resolve(blogPublicDir, 'posts.json'))) {
    posts = await generatePostMeta();
  } else {
    posts = await readJsonSync(resolve(blogPublicDir, 'posts.json'));
  }

  const slugs = Object.keys(posts).filter(
    slug => !existsSync(resolve(blogPublicDir, 'html', `${slug}.html`)),
  );

  try {
    await render(slugs, blogPublicDir, blogContentDir);
    await parseLatex();
    await optimizeSvg();
    await saveJson();
    if (!existsSync(resolve(blogPublicDir, 'atom.xml'))) {
      rss(posts, blogPublicDir);
    }
  } catch (e) {
    console.log(e);
  }
})();
