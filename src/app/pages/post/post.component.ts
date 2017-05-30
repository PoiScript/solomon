import {Component, Injector, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SOLOMON_POST, Post} from 'app/app.config';

@Component({
  selector: 'solomon-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  private posts: Post[];

  constructor (injector: Injector,
               private route: ActivatedRoute,
               private router: Router) {
    this.posts = injector.get(SOLOMON_POST).item;
  }

  ngOnInit () {
  }
}
