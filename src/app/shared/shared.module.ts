import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PostItems} from './post-items/post-items';
import {ViewerComponent} from './viewer';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    PostItems
  ],
  declarations: [ViewerComponent],
  exports: [ViewerComponent]
})
export class SharedModule {}
