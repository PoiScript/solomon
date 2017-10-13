import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import {
  MdButtonModule,
  MdChipsModule,
  MdDialogModule,
  MdIconModule,
  MdInputModule,
  MdListModule,
  MdProgressBarModule,
  MdSnackBarModule,
  MdToolbarModule,
  MdTooltipModule
} from '@angular/material';

import { PostListComponent } from './post-list/post-list.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    RouterModule,
    MdButtonModule,
    MdChipsModule,
    MdDialogModule,
    MdIconModule,
    MdInputModule,
    MdListModule,
    MdProgressBarModule,
    MdSnackBarModule,
    MdToolbarModule,
    MdTooltipModule
  ],
  declarations: [
    PostListComponent
  ],
  exports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    RouterModule,
    PostListComponent,
    MdButtonModule,
    MdChipsModule,
    MdDialogModule,
    MdIconModule,
    MdInputModule,
    MdListModule,
    MdProgressBarModule,
    MdSnackBarModule,
    MdToolbarModule,
    MdTooltipModule
  ]
})
export class SharedModule {}
