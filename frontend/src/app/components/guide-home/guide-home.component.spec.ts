import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuideHomeComponent } from './guide-home.component';

describe('GuideHomeComponent', () => {
  let component: GuideHomeComponent;
  let fixture: ComponentFixture<GuideHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GuideHomeComponent]
    });
    fixture = TestBed.createComponent(GuideHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
