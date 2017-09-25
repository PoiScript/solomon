import { TestBed, inject } from '@angular/core/testing';

import { PostResolverService } from './post-resolver.service';

describe('PostResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PostResolverService]
    });
  });

  it('should be created', inject([PostResolverService], (service: PostResolverService) => {
    expect(service).toBeTruthy();
  }));
});
