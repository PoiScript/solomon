import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import {
  MdButtonModule, MdChipsModule, MdDialogModule, MdIconModule, MdInputModule, MdSnackBarModule,
  MdTooltipModule
} from '@angular/material';

import { PostListComponent } from './post-list/post-list.component';
import { UserService } from './user.service';
import { SnackBarService } from './snack-bar.service';

@NgModule({
  imports: [
    CommonModule, // ngFor
    RouterModule,
    FlexLayoutModule,
    MdButtonModule,
    MdChipsModule,
    MdDialogModule,
    MdIconModule,
    MdInputModule,
    MdSnackBarModule,
    MdTooltipModule
  ],
  declarations: [
    PostListComponent
  ],
  exports: [
    CommonModule,
    RouterModule,
    FlexLayoutModule,
    PostListComponent,
    MdTooltipModule
  ],
  providers: [
    UserService,
    SnackBarService
  ]
})
export class SharedModule {}
