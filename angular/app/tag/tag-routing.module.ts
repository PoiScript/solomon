import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TagComponent } from './tag.component';

const routes: Routes = [
  {path: ':tag', component: TagComponent}
];

export const TagRoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
