import { Component } from '@angular/core';
import { AuthService } from '../../../shared/service/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
[x: string]: any;

  constructor(private _AuthService:AuthService, private _Router:Router){}

  msgError:string=''
  isloading:boolean=false
  auth:any


  loginform:FormGroup=new FormGroup({
    email:new FormControl('',[Validators.required,Validators.email]),
    password:new FormControl('',[Validators.required,Validators.pattern(/^[A-Z][A-Za-z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{6,20}$/),Validators.minLength(8)]),
  })

  handleform()
  {
    if(this.loginform.valid)
    {

      console.log(this.loginform.value)
      this.isloading=true
      this._AuthService.setlogin(this.loginform.value).subscribe({
        next:(response)=>{
          console.log(response)
          if(response.isSucceeded==true){
            this.isloading=false
            localStorage.setItem('Token',response.message)
            this._AuthService.saveUserData()
            this.auth=this._AuthService.auth
            if(this.auth=="admin"||this.auth=="doctor"||this.auth=="recieption"){
            this._Router.navigate(['/d'])
            }else if(this.auth=="patient"){
              this._Router.navigate(['/p'])
              }
          }

        },
        error:(err:HttpErrorResponse)=>{
          this.isloading=false

          this.msgError=err.error.message
          console.log(err.error.message)
        }
      })
    }
  }

}
