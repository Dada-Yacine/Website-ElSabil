import { ComponentFixture, TestBed } from '@angular/core/testing';

import { STopNavComponent } from './top-nav.component';

describe('TopNavComponent', () => {
  let component: STopNavComponent;
  let fixture: ComponentFixture<STopNavComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [STopNavComponent]
    });
    fixture = TestBed.createComponent(STopNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
