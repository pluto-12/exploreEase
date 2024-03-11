import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuideJobsComponent } from './guide-jobs.component';

describe('GuideJobsComponent', () => {
  let component: GuideJobsComponent;
  let fixture: ComponentFixture<GuideJobsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GuideJobsComponent]
    });
    fixture = TestBed.createComponent(GuideJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
