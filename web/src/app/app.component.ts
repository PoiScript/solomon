import { Component, OnInit } from '@angular/core';

import { PostService } from './core/post.service';

@Component({
  selector: 'solomon-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private postService: PostService) {}

  ngOnInit() {
    this.postService.fetchPostDict();
  }
}
