import {Component, Input} from '@angular/core'
import {Link} from '../../../../class/link'

@Component({
  selector: 'solomon-link-list',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss']
})
export class LinkListComponent {
  @Input() links: Link[]

  lickClicked(link_address: string): void {
    window.open(link_address)
  }
}
