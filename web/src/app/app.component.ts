import { AfterViewInit, ApplicationRef, Component } from '@angular/core';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationStart,
  Router,
} from '@angular/router';

@Component({
  selector: 'solomon-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  loading = true;

  constructor(private router: Router, private appRef: ApplicationRef) {}

  ngAfterViewInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.loading = true;
        this.appRef.tick();
      } else if (
        event instanceof NavigationCancel ||
        event instanceof NavigationEnd
      ) {
        this.loading = false;
        this.appRef.tick();
      }
    });
  }
}
