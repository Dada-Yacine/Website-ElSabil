import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReponseTaskComponent } from './reponse-task.component';

describe('ReponseTaskComponent', () => {
  let component: ReponseTaskComponent;
  let fixture: ComponentFixture<ReponseTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReponseTaskComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReponseTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
