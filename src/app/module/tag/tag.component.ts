import {Component, OnInit} from '@angular/core'
import {PostService} from '../../service/post'
import {Intro} from '../../class/post'
import {ActivatedRoute} from '@angular/router'

@Component({
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss']
})
export class TagComponent implements OnInit {
  intros: Intro[]
  tag: string

  constructor(private postService: PostService,
              private router: ActivatedRoute) {
  }

  getArchive(): void {
    this.postService
      .getArchive()
      .then(intros => this.intros = intros)
  }

  ngOnInit(): void {
    this.getArchive()
    this.router.params
      .subscribe(params => this.tag = params['tag'])
  }

}
