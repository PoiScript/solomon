import {Component, OnInit} from "@angular/core"
import {GitHubService} from "./github.service"
import {Repo} from "./repo"

@Component({
	selector: 'github',
	templateUrl: './github.component.html',
	styleUrls: ['./github.component.css'],
	providers: [GitHubService]
})

export class GitHubComponent implements OnInit {
	repos: Repo[]

	constructor(private _githubService: GitHubService) {
	}

	ngOnInit() {
		this._githubService.getRepos()
			.subscribe(
				data => this.repos = parseGitHubApiJSON(data, 6),
				err => alert(err),
				() => console.log('GitHub Repo Refreshed.')
			)
	}
}

function parseGitHubApiJSON(repos, limit): Repo[] {
	let result: Repo[] = []
	repos.some((repo, index) => {
		result.push(new Repo(repo))
		return index === limit
	})
	return result
}
