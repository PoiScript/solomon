import {NgModule} from "@angular/core"
import {CommonModule} from "@angular/common"
import {ShareModule} from "../share"
import {CategoryRouting} from "./category.routing"
import {CategoryComponent} from "./category.component"
import {FlexLayoutModule} from "@angular/flex-layout"

@NgModule({
	imports: [
		CommonModule,
		ShareModule,
		CategoryRouting,
		FlexLayoutModule
	],
	declarations: [
		CategoryComponent
	]
})
export class CategoryModule {
}
