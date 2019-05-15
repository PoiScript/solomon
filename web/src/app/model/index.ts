export interface Post {
  title: string;
  slug: string;
  date: string;
  tags: string[];
  html: string;
  next?: PostInfo;
  prior?: PostInfo;
}

export interface PostInfo {
  title: string;
  slug: string;
  tags: string[];
  date: string;
}

export interface PostGroup {
  year: number;
  entries: PostInfo[];
}

export interface Link {
  address: string;
  avatar: string;
  name: string;
}
