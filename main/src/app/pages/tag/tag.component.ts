import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {Post} from 'app/app.types';
import {PostService} from 'app/shared/post-service';

@Component({
  selector: 'solomon-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss']
})
export class TagComponent implements OnInit {

  tag: string;
  posts: Post[];

  constructor (private postService: PostService,
               private route: ActivatedRoute) { }

  ngOnInit () {
    this.route.params.subscribe((params: Params) => {
      this.tag = params['tag'];
      this.posts = this.postService.getPostsByTag(params['tag']);
    });
  }

}
