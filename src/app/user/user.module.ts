import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared';
import { UserRoutingModule } from './user-routing.module';

import { LogInComponent } from './log-in/log-in.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ProfileEditorComponent } from './profile-editor/profile-editor.component';
import { AuthActionComponent } from './auth-action/auth-action.component';

@NgModule({
  imports: [
    UserRoutingModule,
    SharedModule
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
