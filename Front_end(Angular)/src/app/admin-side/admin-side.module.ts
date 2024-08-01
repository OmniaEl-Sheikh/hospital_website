import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import { DefaultComponent } from './layouts/default/default.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { RouterModule } from '@angular/router';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ViewSpecializationComponent } from './specializations/view-specialization/view-specialization.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { AddSpecializationDialogComponent } from './specializations/add-specialization-dialog/add-specialization-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { EditSpectializationDialogComponent } from './specializations/edit-spectialization-dialog/edit-spectialization-dialog.component';
import { ConfirmDeleteDialogComponent } from './specializations/confirm-delete-dialog/confirm-delete-dialog.component';
import { ViewDoctorComponent } from './doctor/view-doctor/view-doctor.component';
import { AddDoctorDialogComponent } from './doctor/add-doctor-dialog/add-doctor-dialog.component';
import { EditDoctorDialogComponent } from './doctor/edit-doctor-dialog/edit-doctor-dialog.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatSelectModule } from '@angular/material/select';
import { ViewReciptionistComponent } from './reciptionist/view-reciptionist/view-reciptionist.component';
import { EditReciptionistComponent } from './reciptionist/edit-reciptionist/edit-reciptionist.component';
import { AddReciptionistComponent } from './reciptionist/add-reciptionist/add-reciptionist.component';
import { ViewPatientComponent } from './patient/view-patient/view-patient.component';
import { AddPatientDialogComponent } from './patient/add-patient-dialog/add-patient-dialog.component';
import { ViewAppointmentComponent } from './appointment/view-appointment/view-appointment.component';
import { ViewDoctorAppointmentComponent } from './doctor-appointment/view-doctor-appointment/view-doctor-appointment.component';
import { ViewWorkingScheduleComponent } from './doctor-appointment/view-working-schedule/view-working-schedule.component';
import { UpdateWarkingScheduleDialogComponent } from './doctor-appointment/update-warking-schedule-dialog/update-warking-schedule-dialog.component';
import { AddAdminDialogComponent } from './admin/add-admin-dialog/add-admin-dialog.component';
import { EditAdminDialogComponent } from './admin/edit-admin-dialog/edit-admin-dialog.component';
import { ViewAdminComponent } from './admin/view-admin/view-admin.component';



@NgModule({
  declarations: [
    SidebarComponent,
    DefaultComponent,
    NavbarComponent,
    ViewSpecializationComponent,
    AddSpecializationDialogComponent,
    EditSpectializationDialogComponent,
    ConfirmDeleteDialogComponent,
    ViewDoctorComponent,
    AddDoctorDialogComponent,
    EditDoctorDialogComponent,
    ViewReciptionistComponent,
    EditReciptionistComponent,
    AddReciptionistComponent,
    ViewPatientComponent,
    AddPatientDialogComponent,
    ViewAppointmentComponent,
    ViewDoctorAppointmentComponent,
    ViewWorkingScheduleComponent,
    UpdateWarkingScheduleDialogComponent,
    AddAdminDialogComponent,
    EditAdminDialogComponent,
    ViewAdminComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    MatDividerModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatListModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    FlexLayoutModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatChipsModule,
    MatSelectModule
    
  ]
})
export class AdminSideModule { }
