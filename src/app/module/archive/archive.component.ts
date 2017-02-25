import {Component, OnInit} from '@angular/core'
import {PostService} from '../../service/post/post.service'
import {Intro} from '../../class/post'

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss']
})
export class ArchiveComponent implements OnInit {
  intros: Intro[]

  constructor(private postService: PostService) {
  }

  getArchive(): void {
    this.postService
      .getArchive()
      .then(intros => this.intros = intros)
  }

  ngOnInit() {
    this.getArchive()
  }

}
