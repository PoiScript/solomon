import {Component, OnInit} from '@angular/core'
import {Router} from '@angular/router'
import {ResizeService} from '../../service/resize/resize.service'

@Component({
  selector: 'solomon-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [ResizeService]
})
export class HeaderComponent implements OnInit {
  title: string
  isPost: boolean = false
  isSMLayout: boolean

  constructor(private router: Router,
              private resizeService: ResizeService) {
    router.events.subscribe(val => this.isPost = val.url.split('/')[1] === 'post')
    resizeService.window.subscribe(val => {
      if (val) {
        this.isSMLayout = val.innerWidth <= 960
      }
    })
  }

  ngOnInit(): void {
    this.isSMLayout = window.innerWidth <= 960
  }

}
