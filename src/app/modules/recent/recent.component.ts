import {Component, OnInit} from "@angular/core"
import {PostService} from "../../service/post/post.service"
import {Post} from "../../classes/Post"
import {Repo} from "../../classes/Repo"
import {GitHubService} from "../../service/github"
import {KitsuService} from "../../service/kitsu"
import {Anime} from "../../classes/Anime"

@Component({
	template: `
    <app-header [title]="'Recent'"></app-header>
    <post-list [posts]="posts" [limit]="6" [title]="'Recent Posts'"></post-list>
    <repo-list [repos]="repos"></repo-list>
    <anime-list [animes]="animes"></anime-list>
	`,
})
export class RecentComponent implements OnInit {
	posts: Post[]
	repos: Repo[]
	animes: Anime[]

	constructor(private postService: PostService,
	            private githubService: GitHubService,
	            private kitsuService: KitsuService) {
	}

	getArchives(): void {
		this.postService
			.getArchive()
			.then(posts => this.posts = posts)
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
	}
}
