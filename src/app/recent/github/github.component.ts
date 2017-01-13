import {Component, OnInit} from "@angular/core"
import {GitHubService} from "../../service/github"
import {Repo} from "../../service/github/repo"
import {api} from "../../../config/api"
import {colors} from "../../../config/color"

@Component({
	selector: 'github',
	templateUrl: './github.component.html',
	styleUrls: ['./github.component.css'],
	providers: [GitHubService]
})

export class GitHubComponent implements OnInit {
	colors = colors
	username: string = api.github_username
	repos: Repo[]

	constructor(private githubService: GitHubService) {
	}

	getRepos(): void {
		this.githubService.getRepos()
			.then(repos => this.repos = repos)
	}

	ngOnInit(): void {
		this.getRepos()
	}
}

