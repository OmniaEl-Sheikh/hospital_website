import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ENTER } from '@angular/cdk/keycodes';
import { AllService } from '../../../shared/service/all.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-edit-profile-dialog',
  templateUrl: './edit-profile-dialog.component.html',
  styleUrls: ['./edit-profile-dialog.component.css']
})
export class EditProfileDialogComponent {
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER] as const;
  userId:string = '';

  editProfileForm: FormGroup;
  genderOptions: any[] = [
    { display: 'Male', value: 0 },
    { display: 'Female', value: 1 }
  ];

  constructor(
    private formBuilder: FormBuilder,
    private doctorService: AllService,
    private dialogRef: MatDialogRef<EditProfileDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {


    let encodedToken: any = localStorage.getItem('Token');



    if (encodedToken) {
      let decodedToken: any = jwtDecode(encodedToken);

      this.userId = decodedToken.UserId;

    }

    this.editProfileForm = this.formBuilder.group({

      fullName: [data?.fullName || '', Validators.required],
      phone: [data?.phone || '', Validators.required],
      gender: [data?.gender || '', Validators.required],
      email: [data?.email || '', [Validators.required, Validators.email]],
      password: [data?.password  || '', Validators.required],
      user_National_ID: [data?.user_National_ID  || '', Validators.required],
      city: [data?.city  || '', Validators.required],
      street: [data?.street  || '', Validators.required],
      building_Number: [data?.building_Number  || '', Validators.required],
      birthDate: [data?.birthDate  || '', Validators.required],
      userId: [this.userId || '', Validators.required],

    });
  }

  // Call this method to update the profile data
  updateProfile(): void {
    if (this.editProfileForm.valid) {
      const formData = this.editProfileForm.value;
      this.doctorService.updateById(formData).subscribe(
        response => {
          console.log('Profile updated successfully', response);
          this.dialogRef.close();
        },
        error => {
          console.error('Error updating profile', error);
        }
      );
    }
  }
}
