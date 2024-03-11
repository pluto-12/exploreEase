import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuideReviewsComponent } from './guide-reviews.component';

describe('GuideReviewsComponent', () => {
  let component: GuideReviewsComponent;
  let fixture: ComponentFixture<GuideReviewsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GuideReviewsComponent]
    });
    fixture = TestBed.createComponent(GuideReviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
