import {Component, Input} from '@angular/core';

import {Intro} from '../../../../class/post';

@Component({
  selector: 'solomon-post-preview',
  templateUrl: './post-preview.component.html',
  styleUrls: ['./post-preview.component.scss']
})
export class PostPreviewComponent {
  @Input() intro: Intro;
}
