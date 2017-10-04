import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MdButtonModule, MdInputModule } from '@angular/material';

import { SharedModule } from 'app/shared';
import { UserRoutingModule } from './user-routing.module';
import { LogInComponent } from './log-in/log-in.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

@NgModule({
  imports: [
    FormsModule,
    UserRoutingModule,
    SharedModule,
    MdButtonModule,
    MdInputModule
  ],
  declarations: [
    LogInComponent,
    UserProfileComponent
  ]
})
export class UserModule { }
