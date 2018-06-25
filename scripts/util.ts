import { readdirSync, statSync } from 'fs-extra';
import { resolve } from 'path';

export const sortByDate = (a, b) =>
  a.date < b.date ? 1 : a.date > b.date ? -1 : 0;

export const MetaRegex = /```yaml[a-z]*\n[\s\S]*?\n```/;

export const walk = (dir, regexp, list = []) => {
  const files = readdirSync(dir);
  for (const file of files) {
    const path = resolve(dir, file);
    if (statSync(path).isDirectory()) {
      walk(path, regexp, list);
    } else if (file.match(regexp)) {
      list.push(path);
    }
  }
  return list;
};
