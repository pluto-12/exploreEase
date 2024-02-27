import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddnewDialogComponent } from './addnew-dialog.component';

describe('AddnewDialogComponent', () => {
  let component: AddnewDialogComponent;
  let fixture: ComponentFixture<AddnewDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddnewDialogComponent]
    });
    fixture = TestBed.createComponent(AddnewDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
