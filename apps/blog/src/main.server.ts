import { enableProdMode } from '@angular/core';

import { environment } from '@solomon/environment';

if (environment.production) {
  enableProdMode();
}

export { AppServerModule } from './app/app.server.module';
