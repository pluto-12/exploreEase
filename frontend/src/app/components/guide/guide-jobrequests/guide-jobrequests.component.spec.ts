import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuideJobrequestsComponent } from './guide-jobrequests.component';

describe('GuideJobrequestsComponent', () => {
  let component: GuideJobrequestsComponent;
  let fixture: ComponentFixture<GuideJobrequestsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GuideJobrequestsComponent]
    });
    fixture = TestBed.createComponent(GuideJobrequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
