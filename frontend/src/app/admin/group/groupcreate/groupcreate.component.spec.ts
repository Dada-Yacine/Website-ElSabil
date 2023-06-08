import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupcreateComponent } from './groupcreate.component';

describe('GroupcreateComponent', () => {
  let component: GroupcreateComponent;
  let fixture: ComponentFixture<GroupcreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GroupcreateComponent]
    });
    fixture = TestBed.createComponent(GroupcreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
