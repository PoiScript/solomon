import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MdToolbarModule, MdButtonModule } from '@angular/material';

import { AboutComponent } from './about/about.component';
import { FooterComponent } from './footer/footer.component';
import { NavComponent } from './nav/nav.component';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  imports: [
    RouterModule,
    MdButtonModule,
    MdToolbarModule,
  ],
  exports: [
    AboutComponent,
    FooterComponent,
    NavComponent,
    NotFoundComponent,
  ],
  declarations: [
    AboutComponent,
    FooterComponent,
    NavComponent,
    NotFoundComponent,
  ],
})
export class CoreModule {}
