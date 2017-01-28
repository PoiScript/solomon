import {NgModule} from "@angular/core"
import {RouterModule} from "@angular/router"
import {RecentComponent} from "./recent.component"

@NgModule({
	imports: [RouterModule.forChild([{path: '', component: RecentComponent}])],
	exports: [RouterModule]
})

export class RecentRouting {
}