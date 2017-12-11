import { NgModule } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { SharedModule } from 'app/shared';

import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';

import { SnackBarService } from './snack-bar.service';
import { UserService } from './user.service';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    NavComponent,
    FooterComponent,
  ],
  exports: [
    NavComponent,
    FooterComponent,
  ],
  providers: [
    Title,
    UserService,
    SnackBarService
  ]
})
export class CoreModule {}
