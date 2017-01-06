export enum Status {
	current,
	planned,
	completed,
	on_hold,
	dropped
}

export class Anime {
	id: Number
	title_kana: string
	title_roma: string
	averageRating: Number
	episodeCount: Number
	status: Status
	progress: Number

	constructor(anime, libraryEntry) {
		this.id = anime.id
		this.title_kana = anime.attributes.titles.en_jp
		this.title_roma = anime.attributes.titles.ja_jp
		this.averageRating = anime.attributes.averageRating
		this.episodeCount = anime.attributes.episodeCount
		this.status = libraryEntry.attributes.status
		this.progress = libraryEntry.attributes.progress
	}
}