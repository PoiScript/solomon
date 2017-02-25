import {Pipe, PipeTransform} from '@angular/core'

import {Intro} from '../../../class/post'

@Pipe({
  name: 'tag'
})

export class TagPipe implements PipeTransform {

  transform(value: Intro[], args: string): Intro[] {
    if (value) return value.filter(intro => intro.tags && intro.tags.indexOf(args) !== -1)
  }

}
