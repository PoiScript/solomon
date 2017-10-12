import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    HttpModule,
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
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    HttpModule,
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
