import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AllService } from '../../../shared/service/all.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface UserData {
  specialization_ID: number;
  specialization_Name: string;
  specialization_Description: string;

}
@Component({
  selector: 'app-edit-spectialization-dialog',
  templateUrl: './edit-spectialization-dialog.component.html',
  styleUrl: './edit-spectialization-dialog.component.css'
})
export class EditSpectializationDialogComponent {
  @Output() SpecializationUpdated: EventEmitter<void> = new EventEmitter<void>();


  editSpecializationForm: FormGroup;


  constructor(
    private formBuilder: FormBuilder,
    private _AllService:AllService,
    public dialogRef: MatDialogRef<EditSpectializationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserData
  ) {
    this.editSpecializationForm = this.formBuilder.group({
      specialization_ID: [data.specialization_ID, Validators.required],
      specialization_Name: [data.specialization_Name, Validators.required],
      specialization_Description: [data.specialization_Description, Validators.required],

    });
  }

  ngOnInit(): void {}

  onSave(): void {
    if (this.editSpecializationForm.valid) {
      // Logic to save the form data
      this.dialogRef.close(this.editSpecializationForm.value);
    }
  }


  onCancel(): void {
    this.dialogRef.close();
  }
  updateSpecialization():void{
    console.log(this.editSpecializationForm.value)

    if (this.editSpecializationForm.valid) {
      if (this.data) {
        this._AllService
          .updateSpecialization(this.data.specialization_ID, this.editSpecializationForm.value)
          .subscribe({
            next: (val: any) => {
              this.SpecializationUpdated.emit();
              alert('Specialization updated successfully');
              this.dialogRef.close('success');

            },
            error: (err: HttpErrorResponse) => {
              console.error(err.error.error);
            },
          });
  }

}


  }


}
