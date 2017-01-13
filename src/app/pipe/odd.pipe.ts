import {Pipe, PipeTransform} from "@angular/core"
import {Post} from "../service/post/post"

@Pipe({
	name: 'odd'
})
export class OddPipe implements PipeTransform {

	transform(posts: Post[], isOdd?: boolean): any {
		if (!posts) {
			return
		} else if (isOdd) {
			return posts.filter(post => posts.indexOf(post) % 2)
		}
		return posts.filter(post => !(posts.indexOf(post) % 2))
	}

}