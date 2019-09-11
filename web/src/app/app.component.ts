import { AfterViewInit, ApplicationRef, Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationStart,
  Router,
} from '@angular/router';

const arrow =
  '<svg focusable="false" xmlns="http://www.w3.org/2000/svg" width="24" height="24">' +
  '<path d="M8.6 16.3l4.6-4.6-4.6-4.5L10 5.7l6 6-6 6z"/>' +
  '<path fill="none" d="M0-.3h24v24H0z"/>' +
  '</svg>';

const solomon =
  '<svg focusable="false" xmlns="http://www.w3.org/2000/svg" width="24" height="24">' +
  '<g fill="none" stroke="#fff" stroke-width="1.4">' +
  '<path d="M11.6 17.2H4L14.4 1.6l-10 6 7.2 9.6z"/>' +
  '<path d="M12.4 6.8H20L9.6 22.4l10-6-7.2-9.6z"/>' +
  '</g></svg>';

@Component({
  selector: 'solomon-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  loading = true;

  constructor(
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer,
    private router: Router,
    private appRef: ApplicationRef,
  ) {
    this.iconRegistry.addSvgIconLiteral(
      'arrow',
      this.sanitizer.bypassSecurityTrustHtml(arrow),
    );
    this.iconRegistry.addSvgIconLiteral(
      'solomon',
      this.sanitizer.bypassSecurityTrustHtml(solomon),
    );
  }

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
