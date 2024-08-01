// Import necessary modules
import { Component, OnInit } from '@angular/core';
import { AllService } from '../../../shared/service/all.service';

@Component({
  selector: 'app-view-patient-appointment',
  templateUrl: './view-patient-appointment.component.html',
  styleUrls: ['./view-patient-appointment.component.css']
})
export class ViewPatientAppointmentComponent implements OnInit {
  appointments: any[] = [];

  constructor(private allService: AllService) { }

  ngOnInit() {
    this.loadAppointments();
  }

  loadAppointments() {
    this.allService.getFutureAppointments().subscribe(
      (data) => {
        this.appointments = data.map(appointment => ({
          ...appointment,
          status: this.mapStatus(appointment.status)
        }));
      },
      (error) => {
        console.error('Error fetching appointments:', error);
      }
    );
  }

  mapStatus(status: number): string {
    // Implement status mapping logic here
    return status === 0 ? 'Pending' : 'Unknown'; // Example mapping
  }
}
