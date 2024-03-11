import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowGuidesDialogComponent } from './show-guides-dialog.component';

describe('ShowGuidesDialogComponent', () => {
  let component: ShowGuidesDialogComponent;
  let fixture: ComponentFixture<ShowGuidesDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowGuidesDialogComponent]
    });
    fixture = TestBed.createComponent(ShowGuidesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
