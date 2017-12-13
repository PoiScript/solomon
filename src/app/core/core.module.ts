import { NgModule } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { SharedModule } from 'app/shared';

import { SnackBarService } from './snack-bar.service';
import { UserService } from './user.service';

@NgModule({
  imports: [
    SharedModule
  ],
  providers: [
    Title,
    UserService,
    SnackBarService
  ]
})
export class CoreModule {}
