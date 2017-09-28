import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MdButtonModule, MdChipsModule, MdDialogModule, MdIconModule, MdInputModule } from '@angular/material';

import { PostListComponent } from './post-list/post-list.component';
import { UserService } from './user.service';
import { UserProfileComponent } from './user-profile/user-profile.component';

@NgModule({
  imports: [
    CommonModule, // ngFor
    RouterModule,
    MdChipsModule,
    MdDialogModule,
    MdButtonModule,
    MdInputModule,
    MdIconModule
  ],
  declarations: [
    PostListComponent,
    UserProfileComponent
  ],
  exports: [
    CommonModule,
    RouterModule,
    PostListComponent
  ],
  entryComponents: [
    UserProfileComponent
  ],
  providers: [
    UserService
  ]
})
export class SharedModule {}
