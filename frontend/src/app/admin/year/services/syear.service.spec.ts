import { TestBed } from '@angular/core/testing';

import { SyearService } from './syear.service';

describe('SyearService', () => {
  let service: SyearService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SyearService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
