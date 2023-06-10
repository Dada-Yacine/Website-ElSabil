import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAbsenceComponent } from './admin-absence.component';

describe('AdminAbsenceComponent', () => {
  let component: AdminAbsenceComponent;
  let fixture: ComponentFixture<AdminAbsenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAbsenceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAbsenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
