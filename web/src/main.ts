import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environment';

if (environment.production) {
  enableProdMode();
}

window['Zone'] = {
  get current() {
    return this;
  },
  assertZonePatched() {},
  fork() {
    return this;
  },
  get() {
    return true;
  },
  run(fn: Function) {
    return fn();
  },
  runGuarded(fn: Function) {
    return fn();
  },
};

document.addEventListener('DOMContentLoaded', () => {
  platformBrowserDynamic()
    .bootstrapModule(AppModule, {
      preserveWhitespaces: false,
      ngZone: 'noop',
    })
    .catch(err => console.error(err));
});
