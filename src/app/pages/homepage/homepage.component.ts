import {Component, Injector} from '@angular/core';
import {SOLOMON_POST, SolomonPost} from 'app/app.config';

@Component({
  selector: 'solomon-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent {
  post: SolomonPost;

  constructor (injector: Injector) {
    this.post = injector.get(SOLOMON_POST);
  }
}
