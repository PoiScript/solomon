import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { PostService } from './post-service';
import { PostListComponent } from './post-list/post-list.component';

@NgModule({
  imports: [
    CommonModule, // ngFor
    RouterModule
  ],
  declarations: [
    PostListComponent
  ],
  exports: [
    CommonModule,
    RouterModule,
    PostListComponent,
  ],
  providers: [PostService]
})
export class SharedModule {}
