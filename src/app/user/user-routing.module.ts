import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthActionComponent } from './auth-action/auth-action.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { LogInComponent } from './log-in/log-in.component';

import { AuthGuardService } from './auth-guard.service';

const routes: Routes = [{
  path: '',
  pathMatch: 'full',
  component: UserProfileComponent,
  canActivate: [AuthGuardService]
}, {
  path: 'action',
  component: AuthActionComponent
}, {
  path: 'login',
  component: LogInComponent
}];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
    AuthGuardService
  ]
})
export class UserRoutingModule {}
