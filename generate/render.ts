import fs = require('fs');
import marked = require('marked');
import path = require('path');

import {Post} from '../src/app/class/post';

function walk (walkPath: string, files: string[]) {
  fs.readdirSync(walkPath)
    .forEach(item => {
      if (fs.statSync(`${walkPath}/${item}`).isDirectory()) {
        walk(walkPath + '/' + item, files);
      } else if (item === 'link.md') {
        return;
      } else if (path.extname(item) === '.md') {
        files.push(fs.readFileSync(`${walkPath}/${item}`, 'utf8'));
      }
    });
}

export function parse (walkPath: string): Post[] {
  const files: string[] = [];
  const posts: Post[] = [];
  walk(walkPath, files);
  for (const file of files) {
    const tokenStart = file.indexOf('```json');
    const tokenEnd = file.indexOf('```', 1);
    if (tokenStart === -1) {
      console.error('[ERROR] Markdown Metadata Missed');
      continue;
    }
    const post = new Post();
    post.intro = JSON.parse(file.substr(tokenStart + 8, tokenEnd - 9));
    if (post.intro.tags) {
      post.intro.tags = post.intro.tags.map(tag => tag.toLowerCase());
    }
    post.html = marked(file.substr(tokenEnd + 3));
    posts.push(post as Post);
  }
  return posts;
}
