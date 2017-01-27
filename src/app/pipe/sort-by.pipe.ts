import {Pipe, PipeTransform} from "@angular/core"
import {Sort} from "../component/comment"
import {Comment} from "../classes/Comment"

@Pipe({
	name: 'sortBy'
})

export class SortByPipe implements PipeTransform {

	transform(value?: Comment[], args?: Sort): any {
		if (value) {
			return value.sort((c1: Comment, c2: Comment) => {
				if (args == Sort.Newest) return c1.created_at.getTime() < c2.created_at.getTime() ? 1 : -1
				if (args == Sort.Oldest) return c1.created_at.getTime() < c2.created_at.getTime() ? -1 : 1
			})
		}
		return
	}
}
