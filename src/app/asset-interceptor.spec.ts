import { TestBed, inject } from '@angular/core/testing';

import { AssetInterceptorService } from './asset-interceptor';

describe('AssetInterceptorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AssetInterceptorService]
    });
  });

  it('should be created', inject([AssetInterceptorService], (service: AssetInterceptorService) => {
    expect(service).toBeTruthy();
  }));
});
