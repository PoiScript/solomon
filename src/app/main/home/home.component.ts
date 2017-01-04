import {Component} from "@angular/core"
import {Post} from "../../post/post"

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {
  title: 'Home'
  posts: Post[]
}