import { Component } from '@angular/core';
import { Post } from 'app/app.types';

import { posts } from '../../../assets/post';

@Component({
  selector: 'solomon-homepage',
  templateUrl: './homepage.component.html'
})
export class HomepageComponent {
  posts: Post[] = posts;
}
