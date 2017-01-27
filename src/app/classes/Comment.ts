export class Comment {
	created_at: Date
	updated_at: Date
	body: string
	user: {
		login: string
		avatar_url: string
		html_url: string
	}
}