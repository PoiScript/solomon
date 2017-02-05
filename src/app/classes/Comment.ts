export class Comment {
	created_at: Date
	updated_at: Date
	body: string
	user: {
		login: string
		avatar_url: string
		html_url: string
	}
	reactions: {
		total_count: number
		"+1": number
		"-1": number
		laugh: number
		hooray: number
		confused: number
		heart: number
	}
}