import { Component, Input, } from '@angular/core';

import { Post } from 'app/shared';

@Component({
  selector: 'solomon-up-next',
  templateUrl: './up-next.component.html',
  styleUrls: ['./up-next.component.scss']
})
export class UpNextComponent {

  @Input() prior: Post;
  @Input() next: Post;

}
