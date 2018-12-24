import { TestBed } from '@angular/core/testing';

import { PostResolver } from './post-resolver';

describe('PostResolver', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PostResolver = TestBed.get(PostResolver);
    expect(service).toBeTruthy();
  });
});
