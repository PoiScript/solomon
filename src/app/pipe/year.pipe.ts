import {Pipe, PipeTransform} from "@angular/core"
import {Intro} from "../classes/Post"

@Pipe({
	name: 'yearPipe'
})
export class YearPipe implements PipeTransform {

	transform(value: Intro[], arg: number): any {
		return value.filter(intro => new Date(intro.date).getFullYear() === arg)
	}

}