export interface Post {
  title: string;
  slug: string;
  date: string;
  tags: string[];
  html: string;
  next?: {
    title: string;
    slug: string;
  };
  prior?: {
    title: string;
    slug: string;
  };
}

export interface PostInfo {
  title: string;
  slug: string;
  tags: string[];
  date: string;
}
