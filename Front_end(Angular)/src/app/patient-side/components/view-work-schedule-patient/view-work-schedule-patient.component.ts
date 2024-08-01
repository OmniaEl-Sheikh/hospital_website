import { Component, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MakeAppointmentDialogComponent } from '../make-appointment-dialog/make-appointment-dialog.component';

@Component({
  selector: 'app-view-work-schedule-patient',
  templateUrl: './view-work-schedule-patient.component.html',
  styleUrls: ['./view-work-schedule-patient.component.css']
})
export class ViewWorkSchedulePatientComponent {
  workingSchedules: any[];

  // Map to convert day numbers to names
  dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  constructor(
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.workingSchedules = this.data.workingSchedules.map((schedule: any) => ({
      ...schedule,
      working_Schedule_Day: this.dayNames[schedule.working_Schedule_Day]
    }));
  }

  makeAppointmentDialog(data: any) {
    const dialogRef = this.dialog.open(MakeAppointmentDialogComponent, {
      data: {
        doctorId: data.doctor_ID
      },
      width: '50%'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if (result === 'success') {
        // Handle success action if needed
      }
    });
  }
}
