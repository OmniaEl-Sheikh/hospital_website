import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs/internal/Observable';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AllService {
  public specializations: { [key: string]: number } = {
    'Cardiology': 1,
    'Dermatology': 2,
    'Neurology': 3,
    'Orthopedics': 4,
    'Pediatrics': 5
  };


  constructor(private _http: HttpClient,private _AuthService:AuthService) { }

  //---------------------------------------Admin Area----------------------------------------------------------//
  //---------------------------------------Admin ----------------------------------------------------------//

  getAllAdmins(): Observable<any> {
    const url= 'https://localhost:7071/api/Admin/GetAllAdmins';

    let newHeader = {
        accept: '*/*',
        Authorization: 'Bearer ' + localStorage.getItem('Token')
      };

    return this._http.get(url,{
      headers:newHeader
    });
  }



  deleteAdmin(id: string): Observable<any> {


    const url =`https://localhost:7071/api/Admin/DeleteAdmin/${id}`;

    let newHeader = {
      accept: '*/*',
      Authorization: 'Bearer ' + localStorage.getItem('Token'),

    };

    return this._http.delete(url,{
      headers:newHeader
    });
  }



  updateAdmin(id: number, data: any): Observable<any> {
    const url= `https://localhost:7071/api/Admin/UpdateAdminInfo//${id}` ;
    let newHeader= {
      accept: '*/*',
      Authorization: 'Bearer ' + localStorage.getItem('Token'),
      'Content-Type': 'application/json'
    };


    return this._http.put(url, data, {
      headers: newHeader
    });
  }

  addAdmin(data: any): Observable<any> {
    const url= 'https://localhost:7071/api/Admin/RegisterAdmin';
    let newHeader= {
      accept: '*/*',
      Authorization: 'Bearer ' + localStorage.getItem('Token'),
      'Content-Type': 'application/json'
    };
    return this._http.post(url, data,{
      headers:newHeader
    });
  }

  //---------------------------------------Reception ----------------------------------------------------------//
  getAllReception(): Observable<any> {
    const url= 'https://localhost:7071/api/Admin/GetAllReceptionists';

    let newHeader = {
        accept: '*/*',
        Authorization: 'Bearer ' + localStorage.getItem('Token')
      };

    return this._http.get(url,{
      headers:newHeader
    });
  }






  deleteReception(id: string): Observable<any> {


    const url =`https://localhost:7071/api/Admin/DeleteReceptionist/${id}`;

    let newHeader = {
      accept: '*/*',
      Authorization: 'Bearer ' + localStorage.getItem('Token'),

    };

    return this._http.delete(url,{
      headers:newHeader
    });
  }



  updateReception(id: number, data: any): Observable<any> {
    const url= `https://localhost:7071/api/Admin/UpdateReceptionistInfo/${id}` ;
    let newHeader= {
      accept: '*/*',
      Authorization: 'Bearer ' + localStorage.getItem('Token'),
      'Content-Type': 'application/json'
    };


    return this._http.put(url, data, {
      headers: newHeader
    });
  }

  addReception(data: any): Observable<any> {
    const url= 'https://localhost:7071/api/Admin/RegisterReceptionist';
    let newHeader= {
      accept: '*/*',
      Authorization: 'Bearer ' + localStorage.getItem('Token'),
      'Content-Type': 'application/json'
    };
    return this._http.post(url, data,{
      headers:newHeader
    });
  }



  //---------------------------------------Doctor ----------------------------------------------------------//
  getAllDoctor(): Observable<any> {
    const url= 'https://localhost:7071/api/Admin/GetAllDoctors';

    let newHeader = {
        accept: '*/*',
        Authorization: 'Bearer ' + localStorage.getItem('Token')
      };

    return this._http.get(url,{
      headers:newHeader
    });
  }




  deleteDoctor(id: string): Observable<any> {


    const url =`https://localhost:7071/api/Admin/DeleteDoctor/${id}`;

    let newHeader = {
      accept: '*/*',
      Authorization: 'Bearer ' + localStorage.getItem('Token'),

    };

    return this._http.delete(url,{
      headers:newHeader
    });
  }



  updateDoctor(id: number, data: any): Observable<any> {
    const url= `https://localhost:7071/api/Admin/UpdateDoctorInfo/${id}` ;
    let newHeader= {
      accept: '*/*',
      Authorization: 'Bearer ' + localStorage.getItem('Token'),
      'Content-Type': 'application/json'
    };


    return this._http.put(url, data, {
      headers: newHeader
    });
  }

  addDoctor(id: number,data: any): Observable<any> {
    const url= `https://localhost:7071/api/Admin/RegisterDoctor/${id}`;
    let newHeader= {
      accept: '*/*',
      Authorization: 'Bearer ' + localStorage.getItem('Token'),
      'Content-Type': 'application/json'
    };
    return this._http.post(url, data,{
      headers:newHeader
    });
  }

  //---------------------------------------Specialization ----------------------------------------------------------//
  getAllSpecialization(): Observable<any> {
    const url= 'https://localhost:7071/api/Admin/GetAllSpecializations';

    let newHeader = {
        accept: '*/*',
        Authorization: 'Bearer ' + localStorage.getItem('Token')
      };

    return this._http.get(url,{
      headers:newHeader
    });
  }

  deleteSpecialization(id: string): Observable<any> {


    const url =`https://localhost:7071/api/Admin/DeleteSpecialization/${id}`;

    let newHeader = {
      accept: '*/*',
      Authorization: 'Bearer ' + localStorage.getItem('Token'),

    };

    return this._http.delete(url,{
      headers:newHeader
    });
  }



  updateSpecialization(id: number, data: any): Observable<any> {
    const url= `https://localhost:7071/api/Admin/UpdateSpecializationInfo/${id}` ;
    let newHeader= {
      accept: '*/*',
      Authorization: 'Bearer ' + localStorage.getItem('Token'),
      'Content-Type': 'application/json'
    };


    return this._http.put(url, data, {
      headers: newHeader
    });
  }

  addSpecialization(data: any): Observable<any> {
    const url= 'https://localhost:7071/api/Admin/AddSpecialization';
    let newHeader= {
      accept: '*/*',
      Authorization: 'Bearer ' + localStorage.getItem('Token'),
      'Content-Type': 'application/json'
    };
    return this._http.post(url, data,{
      headers:newHeader
    });
  }




  ///////////////     Patient dashbard area //////////////

  //////// get doctors by specialization /////////////


  getDoctorsBySpecialization(sId: number): Observable<any> {
    const url = `https://localhost:7071/api/Patient/GetAllDoctorsByTheirSpecialization/${sId}`;
    const headers = new HttpHeaders({
      'Accept': '*/*',
      'Authorization': 'Bearer ' + localStorage.getItem('Token')
    });
    return this._http.get<any[]>(url, { headers });
  }


  ////// post apointment ///////////

  makeAppointment(appointmentData: any): Observable<any> {
    const apiUrl = 'https://localhost:7071/api/Patient/MakeAppointment';

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('Token')
    });

    return this._http.post(apiUrl, appointmentData, { headers });
  }


  ///////////////// get future appointments ///////////////


  getFutureAppointments(): Observable<any[]> {

    const apiUrl = 'https://localhost:7071/api/Patient/GetFutureAppointmentsForPatient';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('Token')
    });

    return this._http.get<any[]>(apiUrl, { headers });
  }

  ///////////////////patient profile////////////////



  getPatientProfile(): Observable<any> {
    const apiUrl = 'https://localhost:7071/api/Patient/GetPatientById';

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('Token')
    });

    return this._http.get<any>(apiUrl, { headers });
  }


  /////////////// update profile  , put API ///////////

  private apiUrl = 'https://localhost:7071/api/Patient/UpdatedPatient/';


  updatePatientProfile(id: number, updatedPatientData: any): Observable<any> {
  const  apiUrl = 'https://localhost:7071/api/Patient/UpdatedPatient/${id}';
    return this._http.put<any>(apiUrl, updatedPatientData);
  }




  ///doctor
  getWorkingSchedule(): Observable<any> {
    const url= 'https://localhost:7071/api/Doctor/GetDoctorWorkingSchedule';

    let newHeader = {
        accept: '*/*',
        Authorization: 'Bearer ' + localStorage.getItem('Token')
      };

    return this._http.get(url,{
      headers:newHeader
    });
  }


  deleteWorkingSchedule(id: number): Observable<any> {


    const url =`https://localhost:7071/api/Doctor/DeleteWorkingSchedule/${id}`;

    let newHeader = {
      accept: '*/*',
      Authorization: 'Bearer ' + localStorage.getItem('Token'),

    };

    return this._http.delete(url,{
      headers:newHeader
    });
  }

  addWorkingSchedule(data: any): Observable<any> {
    const url= 'https://localhost:7071/api/Doctor/AddWorkingSchedule';
    let newHeader= {
      accept: '*/*',
      Authorization: 'Bearer ' + localStorage.getItem('Token'),
      'Content-Type': 'application/json'
    };
    return this._http.post(url, data,{
      headers:newHeader
    });
  }


  getDoctorAppointments(): Observable<any> {
    const url= 'https://localhost:7071/api/Doctor/GetALLAppointments';

    let newHeader = {
        accept: '*/*',
        Authorization: 'Bearer ' + localStorage.getItem('Token')
      };

    return this._http.get(url,{
      headers:newHeader
    });
  }

  deleteAppointment(id: number): Observable<any> {


    const url =`https://localhost:7071/api/Doctor/DeleteOneAppointment/${id}`;

    let newHeader = {
      accept: '*/*',
      Authorization: 'Bearer ' + localStorage.getItem('Token'),

    };

    return this._http.delete(url,{
      headers:newHeader
    });
  }



  getByIdAll(): Observable<any> {
    let encodedToken: any = localStorage.getItem('Token');
    let role = '';
    let id = 0;

    if (encodedToken) {
      let decodedToken: any = jwtDecode(encodedToken);
      role = decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

    }
    console.log("role",role);

    let url = '';
    if (role === 'doctor') {
      url = `https://localhost:7071/api/Doctor/GetDoctorById`;
    } else if (role === 'admin') {
      url = `https://localhost:7071/api/Admin/GetAdminById`;
    } else if(role === 'patient'){
      url = `https://localhost:7071/api/Patient/GetPatientById`;
    }
    else if(role === 'receptionist'){
      url = `https://localhost:7071/api/Receptionist/GetReceptionistById`;
    }


    else {
      throw new Error('Invalid role');
    }

    let headers = new HttpHeaders({
      'Accept': '*/*',
      'Authorization': 'Bearer ' + localStorage.getItem('Token')
    });

    return this._http.get(url, { headers });
  }


    updateById(data: any): Observable<any> {
    let encodedToken: any = localStorage.getItem('Token');
    let role = '';
    let id = 0;

    if (encodedToken) {
      let decodedToken: any = jwtDecode(encodedToken);
      role = decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
      id = decodedToken.Id;
    }
    console.log("role",role);

    let url = '';
    if (role === 'doctor') {
      url = `https://localhost:7071/api/Doctor/UpdateDoctorFromProfile/${id}`;
    } else if (role === 'admin') {
      url = `https://localhost:7071/api/Admin/UpdateAdminInfo/${id}`;
    } else if(role === 'patient'){
      url = `https://localhost:7071/api/Patient/UpdatedPatient/${id}`;
    }
    else if(role === 'recptionist'){
      url = `https://localhost:7071/api/Receptionist/UpdateReceptionistFromProfile/${id}`
    }

    else {
      throw new Error('Invalid role');
    }

    let headers = new HttpHeaders({
      'Accept': '*/*',
      'Authorization': 'Bearer ' + localStorage.getItem('Token')
    });

    return this._http.put(url, data,{ headers });
  }





  



}




