import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LevelmodifyComponent } from './levelmodify.component';

describe('LevelmodifyComponent', () => {
  let component: LevelmodifyComponent;
  let fixture: ComponentFixture<LevelmodifyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LevelmodifyComponent]
    });
    fixture = TestBed.createComponent(LevelmodifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
