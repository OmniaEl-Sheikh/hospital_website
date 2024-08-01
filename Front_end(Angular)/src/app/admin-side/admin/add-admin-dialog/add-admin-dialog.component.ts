import { Component, EventEmitter, Output } from '@angular/core';
import { AllService } from '../../../shared/service/all.service';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-add-admin-dialog',
  templateUrl: './add-admin-dialog.component.html',
  styleUrl: './add-admin-dialog.component.css'
})
export class AddAdminDialogComponent {
  constructor(private _AllService: AllService, private _Router: Router, public dialogRef: MatDialogRef<AddAdminDialogComponent> ) {}

  @Output() RecieptionAdded: EventEmitter<void> = new EventEmitter<void>();


  genderOptions: number[] = [0, 1];
  msgError: any;
  addReceptionistForm: FormGroup = new FormGroup({
    user_National_ID: new FormControl('', [Validators.required]),
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
    }



    if (this.addReceptionistForm.valid) {
      console.log(this.addReceptionistForm.value);
      this._AllService.addAdmin(this.addReceptionistForm.value).subscribe({
        next: (response) => {
          console.log(response)
          if (response.message === 'Admin registered successfully') {
            console.log("added")
            this.RecieptionAdded.emit(); // Emit event when employee added successfully
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
