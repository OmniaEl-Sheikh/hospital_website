import { LiveAnnouncer } from '@angular/cdk/a11y';
import { ENTER } from '@angular/cdk/keycodes';
import { Component, EventEmitter, Inject, Output, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatChipInputEvent, MatChipEditedEvent } from '@angular/material/chips';
import { AllService } from '../../../shared/service/all.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';

export interface UserData {
  doctor_ID: number;
  admin_ID: number;
  specializationId: number;
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
  selector: 'app-edit-doctor-dialog',
  templateUrl: './edit-doctor-dialog.component.html',
  styleUrl: './edit-doctor-dialog.component.css'
})
export class EditDoctorDialogComponent {


//   addOnBlur = true;
//   readonly separatorKeysCodes = [ENTER] as const;

//   announcer = inject(LiveAnnouncer);

//   editDoctorForm: FormGroup;

//   name: string | undefined;
//   ID: number | undefined;
//   email: string | undefined;
//   password: string | undefined;
//   gender: string | undefined;
//   birth_date: string | undefined;
//   admin_id:number | undefined;
//   specialization_id:number | undefined
//   phones:string[] =[]

//   genderOptions: string[] = ['Male', ' Female'];

//   constructor(private formBuilder: FormBuilder){
//     this.editDoctorForm=this.formBuilder.group({
//       id: ['', Validators.required],
//       name: ['', Validators.required],
//       phones:[''],

//     })
//   }


//   // Add method to add phones number to the list
//     // Add method to add phones number to the list
// add(event: MatChipInputEvent): void {
//   const input = event.input;
//   const value = event.value;

//   // Add phones number if input is not empty and is valid
//   if ((value || '').trim()) {
//     this.phones.push(value.trim()); // Push only the value
//     this.editDoctorForm.get('phones')?.setValue(this.phones);
//   }

//   // Reset the input value
//   if (input) {
//     input.value = '';
//   }
// }


//   // Remove method to remove phones number from the list
//   remove(phone: string): void {
//     const index = this.phones.indexOf(phone);

//     if (index >= 0) {
//       this.phones.splice(index, 1);
//       this.editDoctorForm.get('phones')?.setValue(this.phones);
//     }
//   }

//   edit(phone: string, event: MatChipEditedEvent): void {
//     const newphone = event.chip.value.trim();
//     const index = this.phones .indexOf(phone);

//     if (index !== -1) {
//       this.phones[index] = newphone;
//       this.editDoctorForm.get('phones')?.setValue(this.phones);
//     }
//   }

@Output() receptionUpdated: EventEmitter<void> = new EventEmitter<void>();


  editDoctorForm: FormGroup;

  genderOptions: number[] = [0, 1];

  constructor(
    private formBuilder: FormBuilder,
    private _AllService:AllService,
    public dialogRef: MatDialogRef<EditDoctorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserData
  ) {
    this.editDoctorForm = this.formBuilder.group({
      doctor_ID: [data.doctor_ID, Validators.required],
      admin_ID: [data.admin_ID, Validators.required],
      specializationId: [data.specializationId, Validators.required],
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
    if (this.editDoctorForm.valid) {
      // Logic to save the form data
      this.dialogRef.close(this.editDoctorForm.value);
    }
  }
  onGenderChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.editDoctorForm.patchValue({
      gender: +target.value  // Convert string value to number
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }
  updateDoctor():void{
    console.log(this.editDoctorForm.value)

    if (this.editDoctorForm.valid) {
      if (this.data) {
        this._AllService.updateDoctor(this.data.doctor_ID, this.editDoctorForm.value).subscribe({
            next: (val: any) => {
              this.receptionUpdated.emit();
              alert('Doctor updated successfully');
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
