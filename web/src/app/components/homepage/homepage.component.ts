import {
  OnInit,
  ChangeDetectorRef,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/app.models';

@Component({
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HomepageComponent implements OnInit {
  posts: Post[] = [];

  constructor(
    private route: ActivatedRoute,
    private titleService: Title,
    private cdRef: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.route.data.subscribe(({ posts }) => {
      this.titleService.setTitle('Home☆Solomon');
      this.posts = posts;
      this.cdRef.markForCheck();
    });
  }

  tag(post: Post): string {
    return post.tags.map(tag => `#${tag}`).join(' ');
  }
}
