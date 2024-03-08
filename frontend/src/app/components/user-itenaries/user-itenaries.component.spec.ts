import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserItenariesComponent } from './user-itenaries.component';

describe('UserItenariesComponent', () => {
  let component: UserItenariesComponent;
  let fixture: ComponentFixture<UserItenariesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserItenariesComponent]
    });
    fixture = TestBed.createComponent(UserItenariesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
