import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentAbsenceComponent } from './student-absence.component';

describe('StudentAbsenceComponent', () => {
  let component: StudentAbsenceComponent;
  let fixture: ComponentFixture<StudentAbsenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentAbsenceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentAbsenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
