import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursemodifyComponent } from './coursemodify.component';

describe('CoursemodifyComponent', () => {
  let component: CoursemodifyComponent;
  let fixture: ComponentFixture<CoursemodifyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CoursemodifyComponent]
    });
    fixture = TestBed.createComponent(CoursemodifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
