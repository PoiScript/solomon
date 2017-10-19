import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import {
  MatButtonModule,
  MatDialogModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatProgressBarModule,
  MatSnackBarModule,
  MatToolbarModule,
  MatTooltipModule
} from '@angular/material';

import { PostListComponent } from './post-list/post-list.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    PostListComponent
  ],
  exports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    HttpModule,
    RouterModule,
    PostListComponent,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatTooltipModule
  ]
})
export class SharedModule {}
