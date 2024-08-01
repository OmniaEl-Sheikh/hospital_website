import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AllService } from '../../../shared/service/all.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';




export interface UserData {
  admin_ID: number;
  user_National_ID: string;
  fullName: string;
  email: string;
  password: string;
  gender: number;
  city: string;
  street: string;
  building_Number: number;
  birthDate: Date;
  phone: string;
  userId:string
}

@Component({
  selector: 'app-edit-admin-dialog',
  templateUrl: './edit-admin-dialog.component.html',
  styleUrl: './edit-admin-dialog.component.css'
})
export class EditAdminDialogComponent {

  @Output() receptionUpdated: EventEmitter<void> = new EventEmitter<void>();


  editReceptionistForm: FormGroup;

  genderOptions: number[] = [0, 1];

  constructor(
    private formBuilder: FormBuilder,
    private _AllService:AllService,
    public dialogRef: MatDialogRef<EditAdminDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserData
  ) {
    this.editReceptionistForm = this.formBuilder.group({
      admin_ID: [data.admin_ID, Validators.required],
      user_National_ID: [data.user_National_ID, Validators.required],
      fullName: [data.fullName, Validators.required],
      email: [data.email, [Validators.required, Validators.email]],
      password: [data.password, Validators.required],
      gender: [data.gender, Validators.required],
      city: [data.city, Validators.required],
      street: [data.street, Validators.required],
      building_Number: [data.building_Number, Validators.required],
      birthDate: [data.birthDate, Validators.required],
      phone: [data.phone, Validators.required],
      userId: [data.userId, Validators.required],

    });
  }

  ngOnInit(): void {}

  onSave(): void {
    if (this.editReceptionistForm.valid) {
      // Logic to save the form data
      this.dialogRef.close(this.editReceptionistForm.value);
    }
  }
  onGenderChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.editReceptionistForm.patchValue({
      gender: +target.value  // Convert string value to number
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }
  updateAdmin():void{
    console.log(this.editReceptionistForm.value)

    if (this.editReceptionistForm.valid) {
      if (this.data) {
        this._AllService
          .updateAdmin(this.data.admin_ID, this.editReceptionistForm.value)
          .subscribe({
            next: (val: any) => {
              this.receptionUpdated.emit();
              alert('Admin updated successfully');
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
