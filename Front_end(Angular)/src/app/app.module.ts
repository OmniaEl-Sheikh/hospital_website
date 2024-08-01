import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AdminSideModule } from './admin-side/admin-side.module';
import { ProfileComponent } from './components/account/profile/profile.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { EditProfileDialogComponent } from './components/account/edit-profile-dialog/edit-profile-dialog.component';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/account/login/login.component';
import { SignupComponent } from './components/account/signup/signup.component';
import { HttpClientModule } from '@angular/common/http';
import { DefaultPatientComponent } from './patient-side/layout/default-patient/default-patient.component';
import { NavbarComponent } from './patient-side/layout/navbar/navbar.component';
import { ViewDoctorsPatientComponent } from './patient-side/components/view-doctors-patient/view-doctors-patient.component';
import { ViewWorkSchedulePatientComponent } from './patient-side/components/view-work-schedule-patient/view-work-schedule-patient.component';
import { MakeAppointmentDialogComponent } from './patient-side/components/make-appointment-dialog/make-appointment-dialog.component';
import { ViewPatientAppointmentComponent } from './patient-side/components/view-patient-appointment/view-patient-appointment.component';
import { UpdateProfileComponent } from './patient-side/components/update-profile/update-profile.component';
import { MatCardModule } from '@angular/material/card';



@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    EditProfileDialogComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    DefaultPatientComponent,
    NavbarComponent,
    ViewDoctorsPatientComponent,
    ViewWorkSchedulePatientComponent,
    MakeAppointmentDialogComponent,
    ViewPatientAppointmentComponent,
    UpdateProfileComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    AdminSideModule,
    MatIconModule,
    MatButtonModule,
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
    MatSelectModule,
    HttpClientModule,
    MatCardModule,
    FormsModule


  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
