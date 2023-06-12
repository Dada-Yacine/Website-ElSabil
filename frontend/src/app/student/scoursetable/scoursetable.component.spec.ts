import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoursetableComponent } from './scoursetable.component';

describe('ScoursetableComponent', () => {
  let component: ScoursetableComponent;
  let fixture: ComponentFixture<ScoursetableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ScoursetableComponent]
    });
    fixture = TestBed.createComponent(ScoursetableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
