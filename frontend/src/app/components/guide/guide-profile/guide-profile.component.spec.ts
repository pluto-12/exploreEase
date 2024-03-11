import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuideProfileComponent } from './guide-profile.component';

describe('GuideProfileComponent', () => {
  let component: GuideProfileComponent;
  let fixture: ComponentFixture<GuideProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GuideProfileComponent]
    });
    fixture = TestBed.createComponent(GuideProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
