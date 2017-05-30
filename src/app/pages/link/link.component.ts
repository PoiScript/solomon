import {Component, Injector} from '@angular/core';
import {SOLOMON_LINK, SolomonLink} from 'app/app.config';

@Component({
  selector: 'solomon-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss']
})
export class LinkComponent {
  link: SolomonLink;

  constructor (injector: Injector) {
    this.link = injector.get(SOLOMON_LINK);
  }
}
