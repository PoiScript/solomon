import {Component} from '@angular/core'

@Component({
  selector: 'app',
  template: `
    <solomon-header></solomon-header>
    <router-outlet></router-outlet>
  `
})

export class AppComponent {
}
