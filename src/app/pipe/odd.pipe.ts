import {Pipe, PipeTransform} from "@angular/core"
import {Intro} from '../class/post'

@Pipe({
	name: 'odd'
})
export class OddPipe implements PipeTransform {

	transform(intros: Intro[], isOdd?: boolean): any {
		if (!intros) {
			return
		} else if (isOdd) {
			return intros.filter(intro => intros.indexOf(intro) % 2)
		}
		return intros.filter(intro => !(intros.indexOf(intro) % 2))
	}

}
