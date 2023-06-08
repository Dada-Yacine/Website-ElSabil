import { TestBed } from '@angular/core/testing';

import { SLevelService } from './slevel.service';

describe('SLevelService', () => {
  let service: SLevelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SLevelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
