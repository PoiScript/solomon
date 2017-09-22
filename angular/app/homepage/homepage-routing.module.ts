import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomepageComponent } from './homepage.component';

const routes: Routes = [
  {path: '', component: HomepageComponent}
];

export const HomepageRoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
