import { Component, OnInit, ViewChild  } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {MatDialog} from '@angular/material/dialog';
import { ConfirmDeleteDialogComponent } from '../../specializations/confirm-delete-dialog/confirm-delete-dialog.component';
import { EditDoctorDialogComponent } from '../edit-doctor-dialog/edit-doctor-dialog.component';
import { AddDoctorDialogComponent } from '../add-doctor-dialog/add-doctor-dialog.component';
import { HttpClient } from '@angular/common/http';
import { AllService } from '../../../shared/service/all.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../shared/service/auth.service';

export interface UserData {
  [x: string]: any;
  building_Number: any;
  street: any;
  city: any;
  fullName: any;
  user_National_ID: any;
  receptionist_ID: any;
  name: string;
  ID: number;
  email: string;
  password: string;
  gender: string;
  birth_date: string;
  admin_id:number;
  specialization_id:number
  phone:string[]

}


@Component({
  selector: 'app-view-doctor',
  templateUrl: './view-doctor.component.html',
  styleUrl: './view-doctor.component.css'
})
export class ViewDoctorComponent {
  displayedColumns: string[] = [
    'doctor_ID',
    'admin_ID',

    'specializationId',
    'user_National_ID',
    'fullName',
    'email',
    'password',
    'gender',
    'city',
    'street',
    'building_Number',
    'birthDate',
    'phone',
    'action'
  ];
  public dataSource: MatTableDataSource<UserData> = new MatTableDataSource<UserData>();

  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  @ViewChild(MatSort) sort: MatSort | null = null;

  constructor(
    public dialog: MatDialog,
    private http: HttpClient,
    private route: ActivatedRoute,
    private _AllService: AllService,
    private router: Router,
    private _AuthService:AuthService

  ) { }
  Id:any=this._AuthService.Id


  ngOnInit(): void {
    this.route.params.subscribe(() => {
      this.getMethod();
    });
  }

  getMethod() {
    this._AllService.getAllDoctor().subscribe({
      next: (res: UserData[]) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: console.log,
    });
  }

  ngAfterViewInit() {
    if (this.paginator && this.sort) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  addDialog() {
    const dialogRef = this.dialog.open(AddDoctorDialogComponent, { width: '50%' });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'success') {
        this.getMethod();
      }
    });
  }

  editDialog(data: any) {
    const dialogRef = this.dialog.open(EditDoctorDialogComponent, { data, width: '50%' });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'success') {
        this.getMethod();
      }
    });
  }



  openConfirmDialog(doctor_ID: string): void {
    const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent, {
      data: { message: 'هل انت متاكد انك تريد حذف هذا الموظف' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteDoctor(doctor_ID);
      }
    });
  }


  deleteDoctor(id: string):void{

    this._AllService.deleteDoctor(id).subscribe(
      (res) => {
        if (res === 'success') {
          this.getMethod();
        }
        console.log(res)
            alert(`Employee with ID ${id} deleted successfully`);
           this. getMethod()

          },
          error => {
            console.log("eeeeeeee")
            this. getMethod()

            console.log(error)
            alert( error);
          }
    )
  }




}
