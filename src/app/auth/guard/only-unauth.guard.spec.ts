import { TestBed } from '@angular/core/testing';

import { OnlyUnauthGuard } from './only-unauth.guard';

describe('OnlyUnauthGuard', () => {
  let guard: OnlyUnauthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(OnlyUnauthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
