import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YearmodifyComponent } from './yearmodify.component';

describe('YearmodifyComponent', () => {
  let component: YearmodifyComponent;
  let fixture: ComponentFixture<YearmodifyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [YearmodifyComponent]
    });
    fixture = TestBed.createComponent(YearmodifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
