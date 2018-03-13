import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { APP_BASE_HREF } from '@angular/common';

import { AppComponent } from './app.component';
import { AppModule } from './app.module';

describe('AppComponent', () => {

  describe('with real components', () => {

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [AppModule],
        providers: [
          { provide: APP_BASE_HREF, useValue: '/' },
        ],
      })
        .compileComponents();
    }));

    it('should create the app', () => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.debugElement.componentInstance;
      expect(app).toBeTruthy();
    });

  });

  describe('with CUSTOM_ELEMENTS_SCHEMA', () => {

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [AppComponent],
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
      })
        .compileComponents();
    }));

    it('should create the app', () => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.debugElement.componentInstance;
      expect(app).toBeTruthy();
    });

  });

});
