import { enableProdMode } from '@angular/core';
import { environment } from 'environments/environment';
import { initializeApp } from 'firebase';

initializeApp(environment.firebase);

if (environment.production) {
  enableProdMode();
}

export { AppServerModule } from 'app/app.server.module';
