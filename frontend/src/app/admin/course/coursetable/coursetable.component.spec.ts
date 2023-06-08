import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursetableComponent } from './coursetable.component';

describe('CoursetableComponent', () => {
  let component: CoursetableComponent;
  let fixture: ComponentFixture<CoursetableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CoursetableComponent]
    });
    fixture = TestBed.createComponent(CoursetableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
