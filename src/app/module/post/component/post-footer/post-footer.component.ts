import {Component, Input} from '@angular/core'

@Component({
  selector: 'solomon-post-footer',
  templateUrl: './post-footer.component.html',
  styleUrls: ['./post-footer.component.scss']
})
export class PostFooterComponent {
  @Input() nextPostTitle: string
  @Input() nextPostSlug: string
  @Input() previousPostTitle: string
  @Input() previousPostSlug: string
}
