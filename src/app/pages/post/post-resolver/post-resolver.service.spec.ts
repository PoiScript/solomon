import { TestBed, inject } from '@angular/core/testing';

import { PostResolver } from './post-resolver.service';

describe('PostResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PostResolver ],
    });
  });

  it('should be created', inject([PostResolver ], (service: PostResolver ) => {
    expect(service).toBeTruthy();
  }));
});
