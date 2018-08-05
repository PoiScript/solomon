import { readdirSync } from 'fs-extra';

export const sortByDate = (a, b) =>
  a.date < b.date ? 1 : a.date > b.date ? -1 : 0;

export const generateList = posts => {
  for (let i = 0; i < posts.length; i++) {
    delete posts[i].html;

    if (i !== 0) {
      const { title, slug } = posts[i - 1];
      posts[i].next = { title, slug };
    }

    if (i !== posts.length - 1) {
      const { title, slug } = posts[i + 1];
      posts[i].prior = { title, slug };
    }
  }
  return posts;
};

export const listOrgFiles = contentDir =>
  readdirSync(contentDir)
    .filter(f => /\.org$/.exec(f))
    .map(file => file.slice(0, -4));
