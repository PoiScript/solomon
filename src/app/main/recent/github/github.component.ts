import {Component, OnInit} from "@angular/core"
import {GitHubService} from "./github.service"
import {Repo} from "./repo"
import {config} from "../../../../config"

@Component({
	selector: 'github',
	templateUrl: './github.component.html',
	styleUrls: ['./github.component.css'],
	providers: [GitHubService]
})

export class GitHubComponent implements OnInit {
	username: string = config.github_username

	updatedAt: string
	repos: Repo[]

	constructor(private _githubService: GitHubService) {
	}

	ngOnInit() {
		this._githubService.getRepos()
			.subscribe(
				data => {
					this.repos = parseGitHubApiJSON(data, 4)
					let date = new Date(data[0].updated_at)
					this.updatedAt = date.toLocaleDateString() + ' ' + date.toLocaleTimeString()
				},
				err => alert(err),
				() => console.log('GitHub Repo Refreshed.')
			)
	}
}

function parseGitHubApiJSON(data, limit): Repo[] {
	let result: Repo[] = []
	data.some((repo, index) => {
		result.push(new Repo(repo))
		return index === limit
	})
	return result
}
