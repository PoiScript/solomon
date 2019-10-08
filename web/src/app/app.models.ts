export interface Post {
  title: string;
  slug: string;
  published: string;
  updated?: string;
  tags: string[];
  html?: string;
  next?: {
    title: string;
    slug: string;
  };
  prev?: {
    title: string;
    slug: string;
  };
}
