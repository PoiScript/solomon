export class BookCollections {
	status: string
	updated: string
	book: {
		origin_title: string
		author: string[]
		url: string
		images: {
			small: string
			large: string
			medium: string
		}
	}
}