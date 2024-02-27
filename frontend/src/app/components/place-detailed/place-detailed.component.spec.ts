import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaceDetailedComponent } from './place-detailed.component';

describe('PlaceDetailedComponent', () => {
  let component: PlaceDetailedComponent;
  let fixture: ComponentFixture<PlaceDetailedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlaceDetailedComponent]
    });
    fixture = TestBed.createComponent(PlaceDetailedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
