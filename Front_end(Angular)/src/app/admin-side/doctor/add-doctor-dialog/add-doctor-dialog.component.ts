import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import {MatChipEditedEvent, MatChipInputEvent, MatChipsModule} from '@angular/material/chips';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import { ENTER } from '@angular/cdk/keycodes'; // Import ENTER
import { AllService } from '../../../shared/service/all.service';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-add-doctor-dialog',
  templateUrl: './add-doctor-dialog.component.html',
  styleUrl: './add-doctor-dialog.component.css'
})
export class AddDoctorDialogComponent {
  constructor(private _AllService: AllService, private _Router: Router, public dialogRef: MatDialogRef<AddDoctorDialogComponent> ) {}
  specializationId!: number;

  @Output() RecieptionAdded: EventEmitter<void> = new EventEmitter<void>();


  genderOptions: number[] = [0, 1];
  msgError: any;
  addReceptionistForm: FormGroup = new FormGroup({
    user_National_ID: new FormControl('', [Validators.required]),
    specializationId: new FormControl('', [Validators.required]),
    fullName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    userName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.pattern(/^[A-Z][A-Za-z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{6,20}$/),Validators.minLength(8)],),
    confirmPassword: new FormControl('', [Validators.required, Validators.pattern(/^[A-Z][A-Za-z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{6,20}$/),Validators.minLength(8)]),
    phoneNumber: new FormControl('', [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]),
    birthDate: new FormControl('', [Validators.required]),
    gender: new FormControl('', [Validators.required])
  });

  onSave(): void {
    if (this.addReceptionistForm.valid) {
      // Logic to save the form data
      console.log('Form Data:', this.addReceptionistForm.value);
      console.log(typeof this.specializationId);
      console.log('1')
      console.log(1)
    }



    if (this.addReceptionistForm.valid) {
      console.log(this.addReceptionistForm.value);
      this._AllService.addDoctor(this.specializationId,this.addReceptionistForm.value).subscribe({
        next: (response) => {
          console.log(response)
          if (response.message === 'Registered successfully') {
            console.log("added")
            this.RecieptionAdded.emit(); // Emit event when employee added successfully
          alert(' تم اضافه بنجاح');
          this.dialogRef.close('success');

          }
        },
        error: (err: HttpErrorResponse) => {
          this.msgError = err.error;
          console.log(err.error);
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
