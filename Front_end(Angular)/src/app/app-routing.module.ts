import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import path from 'path';
import { DefaultComponent } from './admin-side/layouts/default/default.component';
import { ViewSpecializationComponent } from './admin-side/specializations/view-specialization/view-specialization.component';
import { ViewDoctorComponent } from './admin-side/doctor/view-doctor/view-doctor.component';
import { ViewReciptionistComponent } from './admin-side/reciptionist/view-reciptionist/view-reciptionist.component';
import { ProfileComponent } from './components/account/profile/profile.component';
import { HomeComponent } from './components/home/home.component';
import { ViewPatientComponent } from './admin-side/patient/view-patient/view-patient.component';
import { ViewAppointmentComponent } from './admin-side/appointment/view-appointment/view-appointment.component';
import { ViewDoctorAppointmentComponent } from './admin-side/doctor-appointment/view-doctor-appointment/view-doctor-appointment.component';
import { ViewWorkingScheduleComponent } from './admin-side/doctor-appointment/view-working-schedule/view-working-schedule.component';
import { LoginComponent } from './components/account/login/login.component';
import { SignupComponent } from './components/account/signup/signup.component';
import { DefaultPatientComponent } from './patient-side/layout/default-patient/default-patient.component';
import { ViewDoctorsPatientComponent } from './patient-side/components/view-doctors-patient/view-doctors-patient.component';
import { ViewAdminComponent } from './admin-side/admin/view-admin/view-admin.component';
import { ViewWorkSchedulePatientComponent } from './patient-side/components/view-work-schedule-patient/view-work-schedule-patient.component';
import { ViewPatientAppointmentComponent } from './patient-side/components/view-patient-appointment/view-patient-appointment.component';

const routes: Routes = [
  {path:'' , component:HomeComponent},
  {path:'signup' , component:SignupComponent},
  {path:'login' , component:LoginComponent},

  {path:'d' , component:DefaultComponent,
    children:[{
      path:'' ,
      component:ViewSpecializationComponent,
    },
    {path:'doctor' , component:ViewDoctorComponent},
    {path:'admin' , component:ViewAdminComponent},
    {path:'reciptionist' , component:ViewReciptionistComponent},
    {path:'profile' , component:ProfileComponent},
    {path:'patient' , component:ViewPatientComponent},
    {path:'appointment' , component:ViewAppointmentComponent},
    {path:'doctor-appointment' , component:ViewDoctorAppointmentComponent},
    {path:'working-schedule' , component:ViewWorkingScheduleComponent},


  ]
  },

  {path: 'p',
    component: DefaultPatientComponent,
    children: [
      { path: '', component: ViewDoctorsPatientComponent, pathMatch: 'full' },
      { path: 'patient-work-schedule', component: ViewWorkSchedulePatientComponent },
      { path: 'patient-appointments', component: ViewPatientAppointmentComponent },
      { path: 'profile', component: ProfileComponent },

    ],
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
