import {Component, Inject} from '@angular/core'

import {SolomonConfig} from '../../interface/solomon-config'
import {CONFIG_TOKEN} from '../../config'

@Component({
  selector: 'solomon-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  GITHUB_USERNAME: string
  GITHUB_POST_REPO: string

  constructor(@Inject(CONFIG_TOKEN) config: SolomonConfig) {
    this.GITHUB_USERNAME = config.GITHUB_USERNAME
    this.GITHUB_POST_REPO = config.GITHUB_POST_REPO
  }

}
