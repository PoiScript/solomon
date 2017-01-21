import {Component, OnInit} from "@angular/core"
import {GitHubService} from "../../service/github"
import {Repo} from "../../classes/Repo"

@Component({
	selector: 'github',
	templateUrl: './github.component.html',
	styleUrls: ['./github.component.css'],
	providers: [GitHubService]
})

export class GitHubComponent implements OnInit {
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

