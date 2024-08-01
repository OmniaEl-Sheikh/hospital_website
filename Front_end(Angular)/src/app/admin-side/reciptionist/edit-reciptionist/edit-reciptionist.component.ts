import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AllService } from '../../../shared/service/all.service';
import { HttpErrorResponse } from '@angular/common/http';

export interface UserData {
  receptionist_ID: number;
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
}

@Component({
  selector: 'app-edit-reciptionist',
  templateUrl: './edit-reciptionist.component.html',
  styleUrls: ['./edit-reciptionist.component.css']
})
export class EditReciptionistComponent implements OnInit {
  @Output() receptionUpdated: EventEmitter<void> = new EventEmitter<void>();


  editReceptionistForm: FormGroup;

  genderOptions: number[] = [0, 1];

  constructor(
    private formBuilder: FormBuilder,
    private _AllService:AllService,
    public dialogRef: MatDialogRef<EditReciptionistComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserData
  ) {
    this.editReceptionistForm = this.formBuilder.group({
      receptionist_ID: [data.receptionist_ID, Validators.required],
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
      phone: [data.phone, Validators.required]
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
  updateReception():void{
    console.log(this.editReceptionistForm.value)

    if (this.editReceptionistForm.valid) {
      if (this.data) {
        this._AllService
          .updateReception(this.data.receptionist_ID, this.editReceptionistForm.value)
          .subscribe({
            next: (val: any) => {
              this.receptionUpdated.emit();
              alert('reception updated successfully');
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
