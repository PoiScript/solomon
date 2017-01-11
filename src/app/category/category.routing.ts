import {NgModule} from "@angular/core"
import {Routes, RouterModule} from "@angular/router"
import {CategoryComponent} from "./category.component"

const routes: Routes = [
	{path: '', component: CategoryComponent}
]

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})

export class CategoryRouting {
}