import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ViewerComponent} from './html-viewer';

@NgModule({
  imports: [CommonModule],
  declarations: [ViewerComponent],
  exports: [ViewerComponent]
})
export class SharedModule {}
