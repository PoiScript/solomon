import {Component, OnInit} from "@angular/core"
import {GitHubService} from "../../service/github"
import {Repo} from "../../service/github/repo"
import {api} from "../../../config/api"

@Component({
	selector: 'github',
	templateUrl: './github.component.html',
	styleUrls: ['./github.component.css'],
	providers: [GitHubService]
})

export class GitHubComponent implements OnInit {
	username: string = api.github_username
	repos: Repo[]
	updatedAt: string

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

