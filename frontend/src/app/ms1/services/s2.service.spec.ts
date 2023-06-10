import { TestBed } from '@angular/core/testing';

import { S2Service } from './s2.service';

describe('S2Service', () => {
  let service: S2Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(S2Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
