import {Pipe, PipeTransform} from "@angular/core"
import {Category} from "../service/post/category"

@Pipe({
	name: 'keywordPipe'
})
export class KeywordPipe implements PipeTransform {

	transform(value: Category[], arg: string): any {
		if (value) {
			return value.filter(category => category.title.includes(arg))
		}
		return
	}

}