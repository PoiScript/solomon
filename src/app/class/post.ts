export class Intro {
  title: string
  slug: string
  date: string
  issue_number: number
  image: string
  tags: string[]
}

export class Post {
  intro: Intro
  bookmark: string[]
  previous_title: string
  previous_slug: string
  next_title: string
  next_slug: string
  html: string
}
