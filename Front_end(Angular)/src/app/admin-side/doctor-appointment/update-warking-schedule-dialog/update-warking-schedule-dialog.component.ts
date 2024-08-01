import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AllService } from '../../../shared/service/all.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-update-warking-schedule-dialog',
  templateUrl: './update-warking-schedule-dialog.component.html',
  styleUrls: ['./update-warking-schedule-dialog.component.css']
})
export class UpdateWarkingScheduleDialogComponent {
  editWorkingSchedule: FormGroup;
  days = [
    { value: 1, viewValue: 'Sunday' },
    { value: 2, viewValue: 'Monday' },
    { value: 3, viewValue: 'Tuesday' },
    { value: 4, viewValue: 'Wednesday' },
    { value: 5, viewValue: 'Thursday' },
    { value: 6, viewValue: 'Friday' },
    { value: 7, viewValue: 'Saturday' },
  ];

  constructor(
    private formBuilder: FormBuilder,
    private myService: AllService,
    public dialogRef: MatDialogRef<UpdateWarkingScheduleDialogComponent>
  ) {
    this.editWorkingSchedule = this.formBuilder.group({
      working_Schedule_Day: ['', Validators.required],
      Working_Schedule_End_Time: ['', Validators.required],
      working_Schedule_Start_Time: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.editWorkingSchedule.valid) {
      this.myService.addWorkingSchedule(this.editWorkingSchedule.value).subscribe(
        response => {
          console.log('Working schedule added successfully', response);
          this.dialogRef.close('success'); // Close the dialog and pass 'success' as the result
        },
        error => {
          console.error('Error adding working schedule', error);
        }
      );
    }
  }
}
