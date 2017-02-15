import {Component, Input} from "@angular/core"
import {SideNavService} from "../../../../service/sidenav/sidenav.service"

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html'
})

export class HeaderComponent {
  @Input() title: string

  constructor(private sideNavService: SideNavService) {
  }

  toggleSideNav(): void {
    this.sideNavService.toggleSideNav()
  }
}
