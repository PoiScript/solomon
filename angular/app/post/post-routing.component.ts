import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PostComponent } from './post.component';

const routes: Routes = [
  {path: ':slug', component: PostComponent}
];

export const PostRoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
