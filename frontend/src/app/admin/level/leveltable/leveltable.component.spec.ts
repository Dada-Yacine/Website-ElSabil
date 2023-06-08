import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeveltableComponent } from './leveltable.component';

describe('LeveltableComponent', () => {
  let component: LeveltableComponent;
  let fixture: ComponentFixture<LeveltableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LeveltableComponent]
    });
    fixture = TestBed.createComponent(LeveltableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
