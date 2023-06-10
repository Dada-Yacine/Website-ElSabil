import { TestBed } from '@angular/core/testing';

import { EtudiantserviceService } from './etudiantservice.service';

describe('EtudiantserviceService', () => {
  let service: EtudiantserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EtudiantserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
