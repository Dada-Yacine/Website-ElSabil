import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtudiantModifierComponent } from './etudiant-modifier.component';

describe('EtudiantModifierComponent', () => {
  let component: EtudiantModifierComponent;
  let fixture: ComponentFixture<EtudiantModifierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EtudiantModifierComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EtudiantModifierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
