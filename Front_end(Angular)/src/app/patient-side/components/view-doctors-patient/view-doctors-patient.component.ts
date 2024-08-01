import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { AllService } from '../../../shared/service/all.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ViewWorkSchedulePatientComponent } from '../view-work-schedule-patient/view-work-schedule-patient.component';

@Component({
  selector: 'app-view-doctors-patient',
  templateUrl: './view-doctors-patient.component.html',
  styleUrls: ['./view-doctors-patient.component.css']
})
export class ViewDoctorsPatientComponent implements OnInit {
  specializations: string[] = [
    'Cardiology',
    'Dermatology',
    'Neurology',
    'Orthopedics',
    'Pediatrics'
  ];
  selectedSpecialization: string | undefined;

  displayedColumns: string[] = ['ID', 'name', 'email',  'specialization_id', 'phone', 'action'];
  public dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  @ViewChild(MatSort) sort: MatSort | null = null;

  constructor(public dialog: MatDialog, private _service: AllService, private router: Router) { }

  ngOnInit() {
    // Initialize logic if necessary
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  searchBySpecialization() {
    if (this.selectedSpecialization) {
      const specializationId = this._service.specializations[this.selectedSpecialization];
      this._service.getDoctorsBySpecialization(specializationId).subscribe(
        data => {
          this.dataSource.data = data;
        },
        error => {
          console.error('Error fetching doctors by specialization', error);
        }
      );
    }
  }

  viewWorkingSchedule(doctor: any) {
    const dialogRef = this.dialog.open(ViewWorkSchedulePatientComponent, {
      data: { workingSchedules: doctor.workingSchedules },
      width: '80%'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
