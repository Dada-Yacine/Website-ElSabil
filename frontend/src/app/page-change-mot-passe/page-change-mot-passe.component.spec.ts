import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageChangeMotPasseComponent } from './page-change-mot-passe.component';

describe('PageChangeMotPasseComponent', () => {
  let component: PageChangeMotPasseComponent;
  let fixture: ComponentFixture<PageChangeMotPasseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageChangeMotPasseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageChangeMotPasseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
