import {NgModule} from "@angular/core"
import {CommonModule} from "@angular/common"
import {ShareModule} from "../share"
import {CategoryRouting} from "./category.routing"
import {CategoryComponent} from "./category.component"

@NgModule({
	imports: [
		CommonModule,
		ShareModule,
		CategoryRouting
	],
	declarations: [
		CategoryComponent
	]
})
export class CategoryModule {
}
