import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CordinatorHomeComponent } from './cordinator-home.component';

describe('CordinatorHomeComponent', () => {
  let component: CordinatorHomeComponent;
  let fixture: ComponentFixture<CordinatorHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CordinatorHomeComponent]
    });
    fixture = TestBed.createComponent(CordinatorHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
