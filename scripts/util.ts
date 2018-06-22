export const sortByDate = (a, b) =>
  a.date < b.date ? 1 : a.date > b.date ? -1 : 0;

export const MetaRegex = /```yaml[a-z]*\n[\s\S]*?\n```/;
