import { Component } from '@angular/core';

import { SpinnerService } from 'app/core';

@Component({
  selector: 'solomon-spinner',
  template: '<mat-progress-bar *ngIf="visible" id="spinner" mode="indeterminate"></mat-progress-bar>',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent {

  visible = false;

  constructor (private spinnerService: SpinnerService) {
    this.spinnerService.status$.subscribe(visible => this.visible = visible);
  }

}
