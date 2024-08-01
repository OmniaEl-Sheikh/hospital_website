import { Component,  ViewChild  } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {MatDialog} from '@angular/material/dialog';
import { ConfirmDeleteDialogComponent } from '../../specializations/confirm-delete-dialog/confirm-delete-dialog.component';
import { AllService } from '../../../shared/service/all.service';
import Swal from 'sweetalert2';


export interface UserData {
   id:number,
  status: number;
  appointment_Date: string;
  doctorName: string;
  patientName: string;

}

@Component({
  selector: 'app-view-doctor-appointment',
  templateUrl: './view-doctor-appointment.component.html',
  styleUrl: './view-doctor-appointment.component.css'
})
export class ViewDoctorAppointmentComponent {


  displayedColumns: string[] = ['id','status', 'appointment_Date', 'doctorName', 'patientName','action'];
  dataSource = new MatTableDataSource<UserData>([]);

  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  @ViewChild(MatSort) sort: MatSort | null = null;

   constructor(public dialog: MatDialog,private doctorService: AllService) { }


   getAppointmentStatus(statusNumber :number):string{
    const appointmentMap:{[key:string]:string}={
      '0':'Pending',
      '1':'Visited',
      '2':'Canceled',
      '3':'Missed',
    }
    return appointmentMap[statusNumber] || 'Unknown';
  }

  ngAfterViewInit() {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
    if (this.sort) {
      this.dataSource.sort = this.sort;
    }
    this.getAppointments();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  getAppointments() {
    this.doctorService.getDoctorAppointments().subscribe(
      data => {
        this.dataSource.data = data;
      },
      error => {
        console.error('Error fetching appointments :', error);
      }
    );
  }
  delete(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.doctorService.deleteAppointment(id).subscribe(
          data => {
            console.log("Deleted successfully");
            Swal.fire(
              'Deleted!',
              'Your record has been deleted.',
              'success'
            );
            this.getAppointments();
          },
          error => {
            console.error('Error deleting appointment:', error);

            Swal.fire(

              'Canceled Appointment',

            );
            this.getAppointments();
          }
        );
      }
    });
  }

  formatDateTime(dateTime: string): string {
    const dateObj = new Date(dateTime);
    const day = dateObj.getDate().toString().padStart(2, '0');
    const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
    const year = dateObj.getFullYear();
    const hours = dateObj.getHours().toString().padStart(2, '0');
    const minutes = dateObj.getMinutes().toString().padStart(2, '0');
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  }

}


