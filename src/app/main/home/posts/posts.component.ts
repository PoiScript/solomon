import {Component} from "@angular/core"

@Component({
  selector: 'posts',
	templateUrl: './posts.component.html',
	styleUrls: ['./posts.component.css']
})

export class PostsComponent {
	posts = [
		"post1",
		"post2"
	]
}