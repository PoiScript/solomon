export class Intro {
  title: string;
  slug: string;
  date: string;
  sub_header: string;
  tags: string[];
}

export class Post {
  intro: Intro;
  previous_title: string;
  previous_slug: string;
  next_title: string;
  next_slug: string;
  html: string;
}
