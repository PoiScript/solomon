import { Component } from '@angular/core';

import { Link } from './link.model';
import { links } from '../../../../solomon.conf';

@Component({
  selector: 'solomon-link',
  templateUrl: './link.component.html'
})
export class LinkComponent {
  links: Link[] = links;
}
