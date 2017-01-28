import {NgModule} from "@angular/core"
import {RouterModule} from "@angular/router"
import {PostComponent} from "./post.component"

@NgModule({
	imports: [RouterModule.forChild([{path: ':slug', component: PostComponent}])],
	exports: [RouterModule]
})

export class PostRouting {
}