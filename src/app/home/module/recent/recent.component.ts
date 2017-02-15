import {Component, OnInit} from "@angular/core"
import {Title} from "@angular/platform-browser"
import {KitsuService} from "./service/kitsu/kitsu.service"
import {GitHubService} from "../../../share/service/github"
import {PostService} from "../../../share/service/post"
import {Anime} from "../../../share/classes/Anime"
import {Repo} from "../../../share/classes/Repo"
import {Intro} from "../../../share/classes/Post"

@Component({
	template: `
    <app-header [title]="'Recent'"></app-header>
    <post-list [intros]="intros" [limit]="6" [title]="'Recent Posts'"></post-list>
    <repo-list [repos]="repos"></repo-list>
    <anime-list [animes]="animes"></anime-list>
	`,
})
export class RecentComponent implements OnInit {
	intros: Intro[]
	repos: Repo[]
	animes: Anime[]

	constructor(private postService: PostService,
	            private githubService: GitHubService,
	            private kitsuService: KitsuService,
	            private titleService: Title) {
	}

	getArchives(): void {
		this.postService
			.getArchive()
			.then(intros => this.intros = intros)
	}

	getRepos(): void {
		this.githubService.getRepos()
			.then(repos => this.repos = repos)
	}

	getAnimes(): void {
		this.kitsuService
			.getAnimes()
			.then(animes => this.animes = animes)
	}


	ngOnInit(): void {
		this.getArchives()
		this.getRepos()
		this.getAnimes()
		this.titleService.setTitle('Recent - Solomon')
	}
}
