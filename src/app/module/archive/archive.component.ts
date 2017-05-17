import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';

import {PostService} from '../../service/post';
import {Intro} from '../../class/post';

@Component({
  selector: 'solomon-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss']
})
export class ArchiveComponent implements OnInit {
  intros: Intro[];

  constructor(private postService: PostService,
              private titleService: Title) {
  }

  getArchive(): void {
    this.postService
      .getArchive()
      .then(intros => this.intros = intros);
  }

  ngOnInit() {
    this.titleService.setTitle('Archive - Solomon');
    this.getArchive();
  }

}
