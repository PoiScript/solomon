import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MdButtonModule, MdChipsModule, MdDialogModule, MdIconModule, MdInputModule, MdSnackBarModule } from '@angular/material';

import { PostListComponent } from './post-list/post-list.component';
import { UserService } from './user.service';
import { SnackBarService } from './snack-bar.service';

@NgModule({
  imports: [
    CommonModule, // ngFor
    RouterModule,
    MdButtonModule,
    MdChipsModule,
    MdDialogModule,
    MdIconModule,
    MdInputModule,
    MdSnackBarModule
  ],
  declarations: [
    PostListComponent
  ],
  exports: [
    CommonModule,
    RouterModule,
    PostListComponent
  ],
  providers: [
    UserService,
    SnackBarService
  ]
})
export class SharedModule {}
