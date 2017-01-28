import {Component, Input} from "@angular/core"
import {Repo} from "../../../classes/Repo"

@Component({
	selector: 'repo-list',
	templateUrl: './repo.component.html',
	styleUrls: ['./repo.component.css']
})
export class RepoListComponent {
	@Input() repos: Repo[]
}
