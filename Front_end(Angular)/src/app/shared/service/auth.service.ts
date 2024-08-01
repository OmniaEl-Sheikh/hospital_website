import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private _HttpClient:HttpClient, private _Router:Router) { }
  userData: any = {};
  name: any;
  auth: any;
  Id:any;



  logout(){
    localStorage.removeItem('Token')
    this._Router.navigate(['/'])
  }

  saveUserData(){
    if(localStorage.getItem('Token')!=null)
      {
        let encode:any=localStorage.getItem('Token')
        let decode=jwtDecode(encode)
        this.userData=decode
        this.name = this.userData.UserName;  // Update name
      this.auth = this.userData["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];  // Update auth
      this.Id=this.userData.Id
        console.log(this.userData)
      }
  }

  setRegister(userData:object):Observable<any>
  {
    return this._HttpClient.post(`https://localhost:7071/api/Account/Register`,userData)
  }
  setlogin(userData:object):Observable<any>
  {
    return this._HttpClient.post(`https://localhost:7071/api/Account/Login`,userData)
  }}
