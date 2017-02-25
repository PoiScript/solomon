import {Component, OnInit} from '@angular/core'
import {Title} from '@angular/platform-browser'
import {Post} from '../../class/post'
import {PostService} from '../../service/post/post.service'

@Component({
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})

export class AboutComponent implements OnInit {
  post: Post

  constructor(private titleService: Title,
              private postService: PostService) {
  }

  getAbout(): void {
    this.postService
      .getPost('about')
      .then(post => this.post = post)
  }

  ngOnInit(): void {
    this.titleService.setTitle('About - Solomon')
    this.getAbout()
  }
}
