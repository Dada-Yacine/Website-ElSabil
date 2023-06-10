import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeachermodifierComponent } from './teachermodifier.component';

describe('TeachermodifierComponent', () => {
  let component: TeachermodifierComponent;
  let fixture: ComponentFixture<TeachermodifierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeachermodifierComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeachermodifierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
