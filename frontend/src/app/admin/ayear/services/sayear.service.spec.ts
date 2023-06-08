import { TestBed } from '@angular/core/testing';

import { SayearService } from './sayear.service';

describe('SayearService', () => {
  let service: SayearService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SayearService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
