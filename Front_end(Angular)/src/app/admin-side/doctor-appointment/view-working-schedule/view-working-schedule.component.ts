import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { UpdateWarkingScheduleDialogComponent } from '../update-warking-schedule-dialog/update-warking-schedule-dialog.component';
import { AllService } from '../../../shared/service/all.service';
import Swal from 'sweetalert2';

export interface UserData {
  work_id: number;
  day: number;
  start_time: string;
  end_time: string;

}

@Component({
  selector: 'app-view-working-schedule',
  templateUrl: './view-working-schedule.component.html',
  styleUrls: ['./view-working-schedule.component.css']
})
export class ViewWorkingScheduleComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'working_Schedule_Day', 'working_Schedule_Start_Time', 'working_Schedule_End_Time', 'action'];
  dataSource = new MatTableDataSource<UserData>([]);

  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  @ViewChild(MatSort) sort: MatSort | null = null;

  constructor(public dialog: MatDialog, private doctorService: AllService) { }

  ngAfterViewInit() {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
    if (this.sort) {
      this.dataSource.sort = this.sort;
    }
    this.getWorkingSchedule();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }



  getWorkingSchedule() {
    this.doctorService.getWorkingSchedule().subscribe(
      data => {
        this.dataSource.data = data;
      },
      error => {
        console.error('Error fetching working schedule:', error);
      }
    );
  }

  getDayName(dayNumber: number): string {
    const dayMap: { [key: string]: string } = {
      '1': 'Sunday',
      '2': 'Monday',
      '3': 'Tuesday',
      '4': 'Wednesday',
      '5': 'Thursday',
      '6': 'Friday',
      '7': 'Saturday'
    };
    return dayMap[dayNumber] || 'Unknown';
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
        this.doctorService.deleteWorkingSchedule(id).subscribe(
          data => {
            console.log("Deleted successfully");
            Swal.fire(
              'Deleted!',
              'Your record has been deleted.',
              'success'
            );
            this.getWorkingSchedule();
          },
          error => {
            console.error('Error deleting working schedule:', error);
            Swal.fire(
              'Error!',
              'There was a problem deleting the record.',
              'error'
            );
          }
        );
      }
    });
  }


  addDialog() {
    const dialogRef = this.dialog.open(UpdateWarkingScheduleDialogComponent, { width: '50%' });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'success') {
        this.getWorkingSchedule();
      }
    });
  }
}
