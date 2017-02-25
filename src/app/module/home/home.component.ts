import {Component, OnInit} from '@angular/core'
import {PostService} from '../../service/post'
import {Intro} from '../../class/post'

@Component({
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  intros: Intro[]

  constructor(private postService: PostService) {
  }

  getArchive(): void {
    this.postService
      .getArchive()
      .then(intros => this.intros = intros)
  }

  ngOnInit(): void {
    this.getArchive()
  }
}
