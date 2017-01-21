import {Pipe, PipeTransform} from '@angular/core'
import {Post} from "../classes/Post"

@Pipe({
	name: 'yearPipe'
})
export class YearPipe implements PipeTransform {

	transform(value: Post[], arg: number): any {
		return value.filter((post) => new Date(post.date).getFullYear() === arg)
	}

}