import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AllService } from '../../../shared/service/all.service';

@Component({
  selector: 'app-make-appointment-dialog',
  templateUrl: './make-appointment-dialog.component.html',
  styleUrls: ['./make-appointment-dialog.component.css']
})
export class MakeAppointmentDialogComponent {
  appointmentDate: string = ''; // Initialize with an empty string
  doctorId: number; // Assuming doctor ID input
  isSuccess: boolean = false;
  errorMessage: string = '';

  constructor(
    public dialogRef: MatDialogRef<MakeAppointmentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private allService: AllService
  ) {
    this.doctorId = data.doctorId;
  }

  makeAppointment() {
    // Validate appointment date is not empty
    if (!this.appointmentDate) {
      this.errorMessage = 'Appointment date is required.';
      return;
    }

    // Format the appointment date to match "yyyy-MM-ddTHH:mm:ss.0000" format
    const formattedDate = this.formatDate(this.appointmentDate);

    // Prepare data to send to the API
    const appointmentData = {
      appointment_Date: formattedDate,
      doctorId: this.doctorId
    };

    // Call the service method to make the appointment
    this.allService.makeAppointment(appointmentData).subscribe(
      (response) => {
        console.log('Appointment made successfully:', response);
       alert('Appointment made successfully')
        this.dialogRef.close('success'); // Close dialog on success
      },
      (error) => {
        console.error('Error making appointment:', error);
        console.log(appointmentData)
        this.errorMessage = 'This Appointement is taken . Please try again later.';
      }
    );
  }

  private formatDate(date: string): string {
    // Assuming input date format is "yyyy-MM-ddTHH:mm"
    const [datePart, timePart] = date.split('T');
    const [year, month, day] = datePart.split('-');
    const [hours, minutes] = timePart.split(':');

    const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}:00.0000`;

    return formattedDate;
  }

}
