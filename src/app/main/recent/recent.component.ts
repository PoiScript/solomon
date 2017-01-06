import {Component} from "@angular/core"
import {Post} from "../../post/post"

@Component({
  selector: 'home',
	templateUrl: './recent.component.html',
	styleUrls: ['./recent.component.css']
})

export class RecentComponent {
  title: 'Home'
  posts: Post[]
}