import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaceItenaryDialogComponent } from './place-itenary-dialog.component';

describe('PlaceItenaryDialogComponent', () => {
  let component: PlaceItenaryDialogComponent;
  let fixture: ComponentFixture<PlaceItenaryDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlaceItenaryDialogComponent]
    });
    fixture = TestBed.createComponent(PlaceItenaryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
