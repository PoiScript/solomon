import {Component, OnInit} from "@angular/core"
import {GitHubService} from "./github.service"
import {Repo} from "./repo"
import {api} from "../../../config/api"

@Component({
	selector: 'github',
	templateUrl: './github.component.html',
	styleUrls: ['./github.component.css'],
	providers: [GitHubService]
})

export class GitHubComponent implements OnInit {
	username: string = api.github_username

	updatedAt: string
	reposLeft: Repo[] = []
	reposRight: Repo[] = []

	constructor(private _githubService: GitHubService) {
	}

	ngOnInit() {
		this._githubService.getRepos()
			.subscribe(
				data => {
					let a = 0;
					for (; a <= 2; a++)
						this.reposLeft.push(new Repo(data[a]))
					for (; a <= 5; a++)
						this.reposRight.push(new Repo(data[a]))
					let date = new Date(data[0].pushed_at)
					this.updatedAt = date.toLocaleDateString() + ' ' + date.toLocaleTimeString()
				},
				err => alert(err),
				() => console.log('GitHub Repo Refreshed.')
			)
	}
}

