import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPlannerComponent } from './user-planner.component';

describe('UserPlannerComponent', () => {
  let component: UserPlannerComponent;
  let fixture: ComponentFixture<UserPlannerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserPlannerComponent]
    });
    fixture = TestBed.createComponent(UserPlannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
