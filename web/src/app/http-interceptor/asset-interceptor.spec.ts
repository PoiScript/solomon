import { TestBed, inject } from '@angular/core/testing';

import { AssetInterceptor } from './asset-interceptor';

describe('AssetInterceptor', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AssetInterceptor],
    });
  });

  it('should be created', inject(
    [AssetInterceptor],
    (service: AssetInterceptor) => {
      expect(service).toBeTruthy();
    },
  ));
});
