import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AllService } from '../../../shared/service/all.service';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-specialization-dialog',
  templateUrl: './add-specialization-dialog.component.html',
  styleUrl: './add-specialization-dialog.component.css'
})
export class AddSpecializationDialogComponent {

  constructor(private _AllService: AllService, private _Router: Router, public dialogRef: MatDialogRef<AddSpecializationDialogComponent> ) {}

  @Output() SpeciallizationAdded: EventEmitter<void> = new EventEmitter<void>();


  msgError: any;
  addSpecializationForm: FormGroup = new FormGroup({
    specialization_Name: new FormControl('', [Validators.required]),
    specialization_Description: new FormControl('', [Validators.required]),
  })



  onSave(): void {
    if (this.addSpecializationForm.valid) {
      // Logic to save the form data
      console.log('Form Data:', this.addSpecializationForm.value);
    }



    if (this.addSpecializationForm.valid) {
      console.log(this.addSpecializationForm.value);
      this._AllService.addSpecialization(this.addSpecializationForm.value).subscribe({
        next: (response) => {
          console.log(response)
          if (response) {
            console.log("added")
            this.SpeciallizationAdded.emit(); // Emit event when employee added successfully
          alert(' تم اضافه بنجاح');
          this.dialogRef.close('success');

          }
        },
        error: (err: HttpErrorResponse) => {
          this.msgError = err.error.message;
          console.log(err.error.message);
        }
      });
    }
  }

  onCancel(): void {
    // Logic to handle cancel action
    console.log('Add operation cancelled.');
  }


}
