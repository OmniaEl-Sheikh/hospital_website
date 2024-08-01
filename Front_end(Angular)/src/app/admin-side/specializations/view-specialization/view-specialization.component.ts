import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {MatDialog} from '@angular/material/dialog';
import { AddSpecializationDialogComponent } from '../add-specialization-dialog/add-specialization-dialog.component';
import { EditSpectializationDialogComponent } from '../edit-spectialization-dialog/edit-spectialization-dialog.component';
import { ConfirmDeleteDialogComponent } from '../confirm-delete-dialog/confirm-delete-dialog.component';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { AllService } from '../../../shared/service/all.service';
import { AuthService } from '../../../shared/service/auth.service';


export interface UserData {
  name: string;
  ID: number;
  description: string;
}

const ELEMENT_DATA: UserData[] = [
  { name: 'John Doe', ID: 25, description: '1234 Main St' },
  { name: 'Jane Smith', ID: 30, description: '5678 Elm St' },
  { name: 'Joe Bloggs', ID: 35, description: '9101 Oak St' },
  // Add more data as needed...
];



@Component({
  selector: 'app-view-specialization',
  templateUrl: './view-specialization.component.html',
  styleUrl: './view-specialization.component.css'
})
export class ViewSpecializationComponent implements OnInit{
  displayedColumns: string[] = [
    'specialization_ID',
    'specialization_Name',
    'specialization_Description',

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
    this._AllService.getAllSpecialization().subscribe({
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
    const dialogRef = this.dialog.open(AddSpecializationDialogComponent, { width: '50%' });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'success') {
        this.getMethod();
      }
    });
  }

  editDialog(data: any) {
    const dialogRef = this.dialog.open(EditSpectializationDialogComponent, { data, width: '50%' });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'success') {
        this.getMethod();
      }
    });
  }



  openConfirmDialog(specialization_ID: string): void {
    const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent, {
      data: { message: 'هل انت متاكد انك تريد حذف هذا الموظف' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteSpecialization(specialization_ID);
      }
    });
  }


  deleteSpecialization(id: string):void{

    this._AllService.deleteSpecialization(id).subscribe(
      (res) => {
        if (res) {
          this.getMethod();
        }
        console.log(res)
            alert(` ${id} deleted successfully`);
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
