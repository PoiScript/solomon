import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Title} from '@angular/platform-browser';

import {Post} from '../../class/post';
import {PostService} from '../../service/post';

@Component({
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})

export class PostComponent implements OnInit {
  post: Post;

  constructor (private postService: PostService,
               private titleService: Title,
               private router: ActivatedRoute) {
  }

  getPost (slug: string): void {
    this.postService
      .getPost(slug)
      .then(post => {
        this.post = post;
        this.titleService.setTitle(`${post.intro.title} - Solomon`);
      });
  }

  ngOnInit (): void {
    this.router.params.subscribe(params => this.getPost(params['slug']));
  }
}
