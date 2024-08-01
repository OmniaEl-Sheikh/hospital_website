import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDeleteDialogComponent } from '../../specializations/confirm-delete-dialog/confirm-delete-dialog.component';
import { EditReciptionistComponent } from '../edit-reciptionist/edit-reciptionist.component';
import { AddReciptionistComponent } from '../add-reciptionist/add-reciptionist.component';
import { ActivatedRoute, Router } from '@angular/router';
import { AllService } from '../../../shared/service/all.service';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../../shared/service/auth.service';

export interface UserData {
  receptionist_ID: number;
  admin_ID: number;
  user_National_ID: string;
  fullName: string;
  email: string;
  password: string;
  gender: number;
  city: string;
  street: string;
  building_Number: number;
  birthDate: Date;
  phone: string;
}

@Component({
  selector: 'app-view-reciptionist',
  templateUrl: './view-reciptionist.component.html',
  styleUrls: ['./view-reciptionist.component.css']
})
export class ViewReciptionistComponent implements OnInit {
  displayedColumns: string[] = [
    'receptionist_ID',
    'admin_ID',
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
    this._AllService.getAllReception().subscribe({
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
    const dialogRef = this.dialog.open(AddReciptionistComponent, { width: '50%' });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'success') {
        this.getMethod();
      }
    });
  }

  editDialog(data: any) {
    const dialogRef = this.dialog.open(EditReciptionistComponent, { data, width: '50%' });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'success') {
        this.getMethod();
      }
    });
  }



  openConfirmDialog(receptionist_ID: string): void {
    const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent, {
      data: { message: 'هل انت متاكد انك تريد حذف هذا الموظف' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteRecieption(receptionist_ID);
      }
    });
  }


  deleteRecieption(id: string):void{

    this._AllService.deleteReception(id).subscribe(
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








