import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ViewerComponent} from './html-viewer';
import {PostService} from './post-service';

@NgModule({
  imports: [CommonModule],
  declarations: [ViewerComponent],
  exports: [ViewerComponent],
  providers: [PostService]
})
export class SharedModule { }
