import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AyearmodifyComponent } from './ayearmodify.component';

describe('AyearmodifyComponent', () => {
  let component: AyearmodifyComponent;
  let fixture: ComponentFixture<AyearmodifyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AyearmodifyComponent]
    });
    fixture = TestBed.createComponent(AyearmodifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
