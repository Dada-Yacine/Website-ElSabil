import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentEventsComponent } from './student-events.component';

describe('StudentEventsComponent', () => {
  let component: StudentEventsComponent;
  let fixture: ComponentFixture<StudentEventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentEventsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
