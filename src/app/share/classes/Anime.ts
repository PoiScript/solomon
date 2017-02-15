export class Anime {
	status: string
	updatedAt: string
	slug: string
	canonicalTitle: string
	titles: {
		en: string
		en_jp: string
		ja_jp: string
	}
	progress: Number
	episodeCount: Number
	episodeLength: Number
	posterImage: {
		tiny: string
	}
}