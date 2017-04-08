import fs = require('fs');
import marked = require('marked');
import path = require('path');

import {Intro, Post} from '../src/app/class/post';
import {Link} from '../src/app/class/link';

const files: string[] = [];
const posts: Post[] = [];

function walk (walkPath) {
  fs.readdirSync(walkPath)
    .forEach(item => {
      if (fs.statSync(`${walkPath}/${item}`).isDirectory()) {
        walk(walkPath + '/' + item);
      } else if (item === 'link.md') {
        return;
      } else if (path.extname(item) === '.md') {
        files.push(fs.readFileSync(`${walkPath}/${item}`, 'utf8'));
      }
    });
}

function parse () {
  files
    .forEach(file => {
      const tokenStart = file.indexOf('```json');
      const tokenEnd = file.indexOf('```', 1);
      if (tokenStart === -1) {
        return console.error('[ERROR] Markdown Metadata Missed');
      }
      const post = new Post();
      post.intro = JSON.parse(file.substr(tokenStart + 8, tokenEnd - 9));
      post.html = marked(file.substr(tokenEnd + 3));
      posts.push(post as Post);
    });
}

function generatePostJSON () {
  posts
    .sort((p1: Post, p2: Post) => Date.parse(p1.intro.date) - Date.parse(p2.intro.date))
    .forEach((post: Post, index) => {
      if (post.intro.slug === 'about') {
        fs.writeFile(`src/json/about.json`, JSON.stringify(post), (err) => {
          if (err) {
            console.error(err);
          } else {
            console.log(`[GENERATED] about.json`);
          }
        });
      } else {
        if (index > 0) {
          post.previous_title = posts[index - 1].intro.title;
          post.previous_slug = posts[index - 1].intro.slug;
        }
        if (index < files.length - 1) {
          post.next_title = posts[index + 1].intro.title;
          post.next_slug = posts[index + 1].intro.slug;
        }
        fs.writeFile(`src/json/${post.intro.slug}.json`, JSON.stringify(post), (err) => {
          if (err) {
            console.error(err);
          } else {
            console.log(`[GENERATED] ${post.intro.slug}.json`);
          }
        });
      }
    });
}

function generateArchiveJSON () {
  const archive = posts
    .map(post => post.intro)
    .filter(intro => intro.slug !== 'about')
    .sort((i1: Intro, i2: Intro) => Date.parse(i2.date) - Date.parse(i1.date));
  fs.writeFile('src/json/archive.json', JSON.stringify(archive), (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log('[GENERATED] archive.json');
    }
  });
}

function generateRecentJSON () {
  const recent = posts
    .map(post => post.intro)
    .filter(intro => intro.slug !== 'about')
    .sort((i1: Intro, i2: Intro) => Date.parse(i2.date) - Date.parse(i1.date))
    .slice(0, 4);
  fs.writeFile('src/json/recent.json', JSON.stringify(recent), (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log('[GENERATED] recent.json');
    }
  });
}

function generateLinkJSON (walkPath) {
  const links: Link[] = [];
  const file = fs.readFileSync(`${walkPath}/link.md`, 'utf8');
  file
    .substring(file.indexOf('|:--:|:--:|:--:|:--:|:--:|') + 28, file.lastIndexOf('|')).split('|\n|')
    .forEach(line => {
      links.push({
        github_username: line.split('|')[0],
        display_name: line.split('|')[1],
        link_text: line.split('|')[2],
        link_address: line.split('|')[3],
        bio: line.split('|')[4] || ''
      });
    });
  fs.writeFile('src/json/link.json', JSON.stringify(links), (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log('[GENERATED] link.json');
    }
  });
}

walk('src/markdown');
console.log(`[INFO] ${files.length} files found.`);
parse();
generatePostJSON();
generateArchiveJSON();
generateRecentJSON();
generateLinkJSON('src/markdown');
