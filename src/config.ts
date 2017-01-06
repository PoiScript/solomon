import {stringify} from "querystring"

export const config = {
	github_username: 'PoiScript',
	github_params: stringify({
		type: 'all',
		sort: 'pushed'
	}),
	kitsu_username: 'PoiScript',
	kitsu_params: stringify({
		'filter[user_id]': '140033',
		'filter[media_type]': 'Anime',
		'filter[status]': '1,3',
		include: 'media',
		sort: '-updated_at',
		'page[limit]': '5'
	})
}