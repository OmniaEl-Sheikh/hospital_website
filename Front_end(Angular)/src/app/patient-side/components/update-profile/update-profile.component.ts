import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AllService } from '../../../shared/service/all.service';
@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrl: './update-profile.component.css'
})
export class UpdateProfileComponent {

  editProfileForm!: FormGroup;
  genderOptions = ['Male', 'Female'];

  constructor(
    private dialogRef: MatDialogRef<UpdateProfileComponent>,
    @Inject(MAT_DIALOG_DATA) public patientData: any,
    private formBuilder: FormBuilder,
    private allService: AllService
  ) {
    this.initializeForm();
  }

  initializeForm() {
    this.editProfileForm = this.formBuilder.group({
      fullName: [this.patientData.fullName, Validators.required],
      email: [this.patientData.email, [Validators.required, Validators.email]],
      password: [this.patientData.password],
      gender: [this.patientData.gender.toString(), Validators.required],
      city: [this.patientData.city],
      street: [this.patientData.street],
      building_Number: [this.patientData.building_Number],
      birthDate: [this.patientData.birthDate ? new Date(this.patientData.birthDate) : null, Validators.required]
    });
  }

  onSubmit() {
    if (this.editProfileForm.valid) {
      const formData = this.editProfileForm.value;
      formData.gender = parseInt(formData.gender, 10); // Convert gender back to number

      // Assuming an API method for updating patient profile
      this.allService.updatePatientProfile(this.patientData.patient_ID, formData).subscribe(
        (response) => {
          console.log('Profile updated successfully:', response);
          this.dialogRef.close('success');
        },
        (error) => {
          console.error('Error updating profile:', error);
          // Handle error appropriately (e.g., show error message)
        }
      );
    }
  }

  onCancel() {
    this.dialogRef.close();
  }

}
