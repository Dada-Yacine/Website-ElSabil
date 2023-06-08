import { TestBed } from '@angular/core/testing';

import { ScourseService } from './scourse.service';

describe('ScourseService', () => {
  let service: ScourseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScourseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
