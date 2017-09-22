import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {LinkComponent} from './link.component';

const routes: Routes = [
  {path: '', component: LinkComponent}
];

export const LinkRoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
