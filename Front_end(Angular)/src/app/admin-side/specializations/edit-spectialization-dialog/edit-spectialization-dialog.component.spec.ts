import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSpectializationDialogComponent } from './edit-spectialization-dialog.component';

describe('EditSpectializationDialogComponent', () => {
  let component: EditSpectializationDialogComponent;
  let fixture: ComponentFixture<EditSpectializationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditSpectializationDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditSpectializationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
