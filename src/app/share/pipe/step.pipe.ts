import {Pipe, PipeTransform} from "@angular/core"

@Pipe({
	name: 'step'
})
export class StepPipe implements PipeTransform {

	transform(value: any[], arg: number): any {
		if (!value) return
		return value.filter((item, index) => !(index % arg))
	}

}
