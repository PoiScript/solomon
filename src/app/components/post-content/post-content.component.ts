import {Component, Input} from "@angular/core"
import {Post} from "../../classes/Post"

@Component({
  selector: 'post-content',
  templateUrl: './post-content.component.html',
  styleUrls: ['./post-content.component.css']
})
export class PostContentComponent {
  @Input() post: Post

  goTop(id: string): void {
    window.location.hash = id
  }
}
