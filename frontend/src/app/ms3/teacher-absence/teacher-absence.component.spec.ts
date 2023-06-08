import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherAbsenceComponent } from './teacher-absence.component';

describe('TeacherAbsenceComponent', () => {
  let component: TeacherAbsenceComponent;
  let fixture: ComponentFixture<TeacherAbsenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherAbsenceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeacherAbsenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
