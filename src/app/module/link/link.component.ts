import {Component, OnInit} from '@angular/core'
import {Title} from '@angular/platform-browser'
import {LinkService} from './service/link'
import {Link} from '../../class/link'

@Component({
  template: `
    <solomon-link-list [links]="links"></solomon-link-list>
  `
})
export class LinkComponent implements OnInit {
  links: Link[]

  constructor(private linkService: LinkService,
              private titleService: Title) {
  }

  getLinks(): void {
    this.linkService.getLinks()
      .then(links => this.links = links)
  }

  ngOnInit() {
    this.getLinks()
    this.titleService.setTitle('Link - Solomon')
  }
}
