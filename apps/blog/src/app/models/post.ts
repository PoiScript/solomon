export class Post {
  title: string;
  slug: string;
  date: string;
  tags: string[];
  next?: {
    title: string;
    slug: string;
  };
  prior?: {
    title: string;
    slug: string;
  };
}

export interface PostDict {
  [slug: string]: Post;
}
