import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LevelcreateComponent } from './levelcreate.component';

describe('LevelcreateComponent', () => {
  let component: LevelcreateComponent;
  let fixture: ComponentFixture<LevelcreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LevelcreateComponent]
    });
    fixture = TestBed.createComponent(LevelcreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
