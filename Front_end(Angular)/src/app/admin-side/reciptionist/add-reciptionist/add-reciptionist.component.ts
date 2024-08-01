import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../../../shared/service/auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { AllService } from '../../../shared/service/all.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-reciptionist',
  templateUrl: './add-reciptionist.component.html',
  styleUrls: ['./add-reciptionist.component.css']
})
export class AddReciptionistComponent {
  // @Output() RecieptionAdded: EventEmitter<void> = new EventEmitter<void>();

  // // addReceptionistForm: FormGroup;

  // genderOptions: number[] = [0, 1];
  // msgError: any;

  // constructor(private formBuilder: FormBuilder) {
  //   this.addReceptionistForm = this.formBuilder.group({
  //     receptionist_ID: ['', Validators.required],
  //     admin_ID: ['', Validators.required],
  //     user_National_ID: ['', Validators.required],
  //     fullName: ['', Validators.required],
  //     email: ['', [Validators.required, Validators.email]],
  //     password: ['', Validators.required],
  //     gender: ['', Validators.required],
  //     city: ['', Validators.required],
  //     street: ['', Validators.required],
  //     building_Number: ['', Validators.required],
  //     birthDate: ['', Validators.required],
  //     phone: ['', Validators.required],
  //     confirmPassword: ['', Validators.required],
  //   });
  // }
  constructor(private _AllService: AllService, private _Router: Router, public dialogRef: MatDialogRef<AddReciptionistComponent> ) {}

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
      this._AllService.addReception(this.addReceptionistForm.value).subscribe({
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
