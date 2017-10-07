import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MdButtonModule, MdDialogModule, MdIconModule, MdInputModule, MdListModule } from '@angular/material';

import { SharedModule } from 'app/shared';
import { UserRoutingModule } from './user-routing.module';
import { LogInComponent } from './log-in/log-in.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ProfileEditorComponent } from './profile-editor/profile-editor.component';
import { AuthActionComponent } from './auth-action/auth-action.component';

@NgModule({
  imports: [
    FormsModule,
    UserRoutingModule,
    SharedModule,
    MdButtonModule,
    MdDialogModule,
    MdIconModule,
    MdInputModule,
    MdListModule
  ],
  declarations: [
    LogInComponent,
    UserProfileComponent,
    ProfileEditorComponent,
    AuthActionComponent
  ],
  entryComponents: [
    ProfileEditorComponent
  ]
})
export class UserModule { }
