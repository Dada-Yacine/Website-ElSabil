import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YeartableComponent } from './yeartable.component';

describe('YeartableComponent', () => {
  let component: YeartableComponent;
  let fixture: ComponentFixture<YeartableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [YeartableComponent]
    });
    fixture = TestBed.createComponent(YeartableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
