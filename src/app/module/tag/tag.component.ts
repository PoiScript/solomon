import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Title} from '@angular/platform-browser';

import {PostService} from '../../service/post';
import {Intro} from '../../class/post';

@Component({
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss']
})
export class TagComponent implements OnInit {
  intros: Intro[];
  tag: string;

  constructor (private postService: PostService,
               private titleService: Title,
               private router: ActivatedRoute) {
  }

  getArchive (): void {
    this.postService
      .getArchive()
      .then(intros => this.intros = intros);
  }

  ngOnInit (): void {
    this.getArchive();
    this.router.params.subscribe(params => this.tag = params['tag']);
    this.titleService.setTitle(`#${this.tag} - Solomon`);
  }

}
