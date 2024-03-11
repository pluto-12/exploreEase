import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuideNavbarComponent } from './guide-navbar.component';

describe('GuideNavbarComponent', () => {
  let component: GuideNavbarComponent;
  let fixture: ComponentFixture<GuideNavbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GuideNavbarComponent]
    });
    fixture = TestBed.createComponent(GuideNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
