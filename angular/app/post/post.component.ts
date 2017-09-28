import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { PostResolve } from 'app/shared';

@Component({
  selector: 'solomon-post',
  templateUrl: './post.component.html'
})
export class PostComponent implements OnInit {
  resolve: PostResolve;

  constructor (private route: ActivatedRoute) { }

  ngOnInit () {
    this.route.data
      .subscribe((data: { resolve: PostResolve }) => {
        this.resolve = data.resolve;
      });
  }
}
