import {Component, Input} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {MdIconRegistry} from '@angular/material';

@Component({
  selector: 'solomon-post-footer',
  templateUrl: './post-footer.component.html',
  styleUrls: ['./post-footer.component.scss']
})
export class PostFooterComponent {
  @Input() nextPostTitle: string;
  @Input() nextPostSlug: string;
  @Input() previousPostTitle: string;
  @Input() previousPostSlug: string;

  constructor(private iconRegistry: MdIconRegistry,
              private sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon('arrow_right', sanitizer.bypassSecurityTrustResourceUrl('assets/icon/arrow_right.svg'));
    iconRegistry.addSvgIcon('arrow_left', sanitizer.bypassSecurityTrustResourceUrl('assets/icon/arrow_left.svg'));
  }
}
