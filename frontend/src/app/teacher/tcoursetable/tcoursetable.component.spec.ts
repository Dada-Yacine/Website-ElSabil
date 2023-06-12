import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TcoursetableComponent } from './tcoursetable.component';

describe('TcoursetableComponent', () => {
  let component: TcoursetableComponent;
  let fixture: ComponentFixture<TcoursetableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TcoursetableComponent]
    });
    fixture = TestBed.createComponent(TcoursetableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
