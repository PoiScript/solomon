export class Intro {
	title: string
	slug: string
	date: string
	issue_number: number
	image: string
	category: {
		en_US: string
		zh_Hans: string
		zh_Hant: string
	}
}

export class Post {
	intro: Intro
	previous_title: string
	previous_slug: string
	next_title: string
	next_slug: string
	html: string
}