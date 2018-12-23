import { Component, Input, ViewEncapsulation } from '@angular/core';

import { Post } from '../../model';

@Component({
  selector: 'solomon-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PostListComponent {
  @Input()
  posts: Post[];
}
