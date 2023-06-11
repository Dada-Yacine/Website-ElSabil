import { TestBed } from '@angular/core/testing';

import { SteacherService } from './steacher.service';

describe('SteacherService', () => {
  let service: SteacherService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SteacherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
