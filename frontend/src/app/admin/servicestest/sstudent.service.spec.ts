import { TestBed } from '@angular/core/testing';

import { SstudentService } from './sstudent.service';

describe('SstudentService', () => {
  let service: SstudentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SstudentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
