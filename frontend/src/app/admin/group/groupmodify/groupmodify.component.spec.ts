import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupmodifyComponent } from './groupmodify.component';

describe('GroupmodifyComponent', () => {
  let component: GroupmodifyComponent;
  let fixture: ComponentFixture<GroupmodifyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GroupmodifyComponent]
    });
    fixture = TestBed.createComponent(GroupmodifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
