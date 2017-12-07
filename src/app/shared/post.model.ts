export class Post {
  title: string;
  slug: string;
  date: string;
  tags: string[];
}

export class PostResolve {
  next: Post;
  prior: Post;
  current: Post;
  html: string;
}
