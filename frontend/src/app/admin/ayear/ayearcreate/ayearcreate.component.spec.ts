import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AyearcreateComponent } from './ayearcreate.component';

describe('AyearcreateComponent', () => {
  let component: AyearcreateComponent;
  let fixture: ComponentFixture<AyearcreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AyearcreateComponent]
    });
    fixture = TestBed.createComponent(AyearcreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
