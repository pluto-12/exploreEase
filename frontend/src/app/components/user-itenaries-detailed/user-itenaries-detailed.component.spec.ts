import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserItenariesDetailedComponent } from './user-itenaries-detailed.component';

describe('UserItenariesDetailedComponent', () => {
  let component: UserItenariesDetailedComponent;
  let fixture: ComponentFixture<UserItenariesDetailedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserItenariesDetailedComponent]
    });
    fixture = TestBed.createComponent(UserItenariesDetailedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
