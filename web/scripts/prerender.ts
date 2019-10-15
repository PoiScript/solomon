import 'zone.js/dist/zone-node';

import { outputFile, readFileSync, readJsonSync } from 'fs-extra';
import { resolve } from 'path';
import { minify } from 'html-minifier';

const postsJsonPath = resolve(__dirname, '../../assets/posts.json');
const documentPath = resolve(__dirname, '../dist/app/index.html');
const serverBundlePath = resolve(__dirname, '../dist/server/main');

const posts = readJsonSync(postsJsonPath);
const document = readFileSync(documentPath, 'utf8');

const pages = [
  ['/', 'index.html'],
  ['/about', 'about.html'],
  ['/link', 'link.html'],
  ['/404', '404.html'],
];

for (const post of posts) {
  pages.push([`/post/${post.slug}`, `post/${post.slug}.html`]);
}

(async () => {
  const { AppServerModule, renderModule } = await import(serverBundlePath);

  const res = await Promise.all(
    pages.map(([url, path]) =>
      renderModule(AppServerModule, { url, document })
        .then(html =>
          minify(html, {
            collapseWhitespace: true,
            removeComments: true,
            minifyCSS: true,
          }),
        )
        .then(html =>
          outputFile(resolve(__dirname, '../dist/app/', path), html),
        ),
    ),
  );

  console.log(`Pre-rendered ${res.length} files`);
})();
