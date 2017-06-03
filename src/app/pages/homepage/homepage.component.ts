import {Component} from '@angular/core';
import {Post} from 'app/app.types';
import {PostService} from 'app/shared/post-service';

@Component({
  selector: 'solomon-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent {
  posts: Post[];

  constructor(private postService: PostService) {
    this.posts = postService.getAllPosts();
  }
}
