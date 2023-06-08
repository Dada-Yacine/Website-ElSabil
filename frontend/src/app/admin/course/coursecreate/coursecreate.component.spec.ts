import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursecreateComponent } from './coursecreate.component';

describe('CoursecreateComponent', () => {
  let component: CoursecreateComponent;
  let fixture: ComponentFixture<CoursecreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CoursecreateComponent]
    });
    fixture = TestBed.createComponent(CoursecreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
