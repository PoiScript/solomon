export interface Link {
  github_username: string;
  name: string;
  text: string;
  address: string;
  bio: string;
}

export interface Post {
  title: string;
  slug: string;
  date: string;
  summary: string;
  tags: string[];
  html: string;
}
