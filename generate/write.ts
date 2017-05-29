import fs = require('fs');
import rl = require('readline');

import {Intro, Post} from '../src/app/shared/post';
import {Link} from '../src/app/shared/link';

export function post (posts: Post[]) {
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
        if (index < posts.length - 1) {
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

export function archive (posts: Post[]) {
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

export function recent (posts: Post[]) {
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

export function link (filePath: string) {
  const links: Link[] = [];
  rl.createInterface({input: fs.createReadStream(filePath)})
    .on('line', line => {
      if (line === '|GitHub Username|Nickname|Link Text|Link Address|Bio|' || line === '|:--:|:--:|:--:|:--:|:--:|') {
        return;
      }
      const parts = line.split('|');
      if (parts.length === 7) {
        links.push({
          github_username: parts[1],
          display_name: parts[2],
          link_text: parts[3],
          link_address: parts[4],
          bio: parts[5],
        });
      }
    })
    .on('close', () => {
      fs.writeFile('src/json/link.json', JSON.stringify(links), (err) => {
        if (err) {
          console.error(err);
        } else {
          console.log('[GENERATED] link.json');
        }
      });
    });
}

export function rss (str: string) {
  fs.writeFile('src/atom.xml', str, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log('[GENERATED] atom.xml');
    }
  });
}
