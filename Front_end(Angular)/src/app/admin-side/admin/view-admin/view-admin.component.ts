import { Component, OnInit, ViewChild  } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDeleteDialogComponent } from '../../specializations/confirm-delete-dialog/confirm-delete-dialog.component';
import { AddAdminDialogComponent } from '../add-admin-dialog/add-admin-dialog.component';
import { EditAdminDialogComponent } from '../edit-admin-dialog/edit-admin-dialog.component';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { AllService } from '../../../shared/service/all.service';
import { AuthService } from '../../../shared/service/auth.service';


export interface UserData {
  admin_ID: number;
  user_National_ID: string;
  fullName: string;
  email: string;
  password: string;
  gender: number;
  city: string;
  street: string;
  building_Number: string;
  birthDate: string;
  phone: string;
  userId: string;
}

@Component({
  selector: 'app-view-admin',
  templateUrl: './view-admin.component.html',
  styleUrl: './view-admin.component.css'
})
export class ViewAdminComponent {
  displayedColumns: string[] = [
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
    'userId',
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
    this._AllService.getAllAdmins().subscribe({
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
    const dialogRef = this.dialog.open(AddAdminDialogComponent, { width: '50%' });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'success') {
        this.getMethod();
      }
    });
  }

  editDialog(data: any) {
    const dialogRef = this.dialog.open(EditAdminDialogComponent, { data, width: '50%' });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'success') {
        this.getMethod();
      }
    });
  }



  openConfirmDialog(admin_ID: string): void {
    const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent, {
      data: { message: 'هل انت متاكد انك تريد حذف هذا الموظف' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteAdmin(admin_ID);
      }
    });
  }


  deleteAdmin(id: string):void{

    this._AllService.deleteAdmin(id).subscribe(
      (res) => {
        if (res) {
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
