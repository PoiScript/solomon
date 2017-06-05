import {Component} from '@angular/core';
import {PostService} from 'app/shared/post-service';
import {Post} from 'app/app.types';

@Component({
  selector: 'solomon-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {
  about: Post;

  constructor (private postService: PostService) {
    this.about = this.postService.getPostBySlug('about')[0];
  }
}
