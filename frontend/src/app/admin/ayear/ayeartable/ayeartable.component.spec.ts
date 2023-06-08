import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AyeartableComponent } from './ayeartable.component';

describe('AyeartableComponent', () => {
  let component: AyeartableComponent;
  let fixture: ComponentFixture<AyeartableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AyeartableComponent]
    });
    fixture = TestBed.createComponent(AyeartableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
