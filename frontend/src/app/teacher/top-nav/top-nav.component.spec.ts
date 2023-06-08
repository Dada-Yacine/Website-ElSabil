import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TTopNavComponent } from './top-nav.component';

describe('TopNavComponent', () => {
  let component: TTopNavComponent;
  let fixture: ComponentFixture<TTopNavComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TTopNavComponent]
    });
    fixture = TestBed.createComponent(TTopNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
