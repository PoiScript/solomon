import {Pipe, PipeTransform} from "@angular/core"
import {Category} from "../service/post/category"

@Pipe({
  name: 'categoryPipe'
})
export class CategoryPipe implements PipeTransform {

  transform(value: Category[], arg: string): any {
    return console.log(arg)
  }

}