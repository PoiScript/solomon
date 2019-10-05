import { ApplicationRef, Component, ViewEncapsulation } from '@angular/core';

import { AppService } from '../../app.service';

@Component({
  selector: 'solomon-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LoadingComponent {
  isLoading = false;

  constructor(private appService: AppService, private appRef: ApplicationRef) {
    this.appService.isLoading$.subscribe(isLoading => {
      this.isLoading = isLoading;
      this.appRef.tick();
    });
  }
}
