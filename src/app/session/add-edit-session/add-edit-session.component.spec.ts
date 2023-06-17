import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditSessionComponent } from './add-edit-session.component';

describe('AddEditSessionComponent', () => {
  let component: AddEditSessionComponent;
  let fixture: ComponentFixture<AddEditSessionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddEditSessionComponent]
    });
    fixture = TestBed.createComponent(AddEditSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
