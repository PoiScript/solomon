import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MdChipsModule } from '@angular/material';

import { PostListComponent } from './post-list/post-list.component';

@NgModule({
  imports: [
    CommonModule, // ngFor
    RouterModule,
    MdChipsModule
  ],
  declarations: [
    PostListComponent
  ],
  exports: [
    CommonModule,
    RouterModule,
    PostListComponent,
  ]
})
export class SharedModule {}
