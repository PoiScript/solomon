import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  MdToolbarModule,
  MdButtonModule,
  MdListModule,
  MdIconModule
} from '@angular/material';

import { SharedModule } from 'app/shared';
import { AboutComponent } from './about/about.component';
import { FooterComponent } from './footer/footer.component';
import { LinkComponent } from './link/link.component';
import { NavComponent } from './nav/nav.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomepageComponent } from './homepage/homepage.component';
import { TagComponent } from './tag/tag.component';
import { TagPipe } from './tag.pipe';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MdButtonModule,
    MdListModule,
    MdToolbarModule,
    MdIconModule,
    SharedModule
  ],
  exports: [
    AboutComponent,
    FooterComponent,
    LinkComponent,
    NavComponent,
    NotFoundComponent,
    HomepageComponent,
    TagComponent
  ],
  declarations: [
    AboutComponent,
    FooterComponent,
    LinkComponent,
    NavComponent,
    NotFoundComponent,
    HomepageComponent,
    TagComponent,
    TagPipe
  ]
})
export class CoreModule {}
