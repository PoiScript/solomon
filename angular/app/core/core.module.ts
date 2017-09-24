import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MdToolbarModule, MdButtonModule, MdListModule } from '@angular/material';

import { AboutComponent } from './about/about.component';
import { FooterComponent } from './footer/footer.component';
import { LinkComponent } from './link/link.component';
import { NavComponent } from './nav/nav.component';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MdButtonModule,
    MdListModule,
    MdToolbarModule,
  ],
  exports: [
    AboutComponent,
    FooterComponent,
    LinkComponent,
    NavComponent,
    NotFoundComponent,
  ],
  declarations: [
    AboutComponent,
    FooterComponent,
    LinkComponent,
    NavComponent,
    NotFoundComponent,
  ],
})
export class CoreModule {}
