import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminClassroomsComponent } from './admin-classrooms.component';

describe('AdminClassroomsComponent', () => {
  let component: AdminClassroomsComponent;
  let fixture: ComponentFixture<AdminClassroomsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminClassroomsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminClassroomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
