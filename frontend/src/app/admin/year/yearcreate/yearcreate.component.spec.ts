import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YearcreateComponent } from './yearcreate.component';

describe('YearcreateComponent', () => {
  let component: YearcreateComponent;
  let fixture: ComponentFixture<YearcreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [YearcreateComponent]
    });
    fixture = TestBed.createComponent(YearcreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
