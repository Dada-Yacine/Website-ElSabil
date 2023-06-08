import { TestBed } from '@angular/core/testing';

import { SgroupService } from './sgroup.service';

describe('SgroupService', () => {
  let service: SgroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SgroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
