import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ATopNavComponent } from './top-nav.component';

describe('TopNavComponent', () => {
  let component: ATopNavComponent;
  let fixture: ComponentFixture<ATopNavComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ATopNavComponent]
    });
    fixture = TestBed.createComponent(ATopNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
