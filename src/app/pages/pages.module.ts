import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared';

import { PagesRoutingModule } from './pages-routing.module';
import { AboutComponent } from './about/about.component';
import { LinkComponent } from './link/link.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomepageComponent } from './homepage/homepage.component';
import { TagComponent } from './tag/tag.component';
import { TagPipe } from './tag/tag.pipe';

@NgModule({
  imports: [
    SharedModule,
    PagesRoutingModule
  ],
  declarations: [
    AboutComponent,
    LinkComponent,
    NotFoundComponent,
    HomepageComponent,
    TagComponent,
    TagPipe
  ]
})
export class PagesModule {}
