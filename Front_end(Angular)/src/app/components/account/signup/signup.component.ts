import { Component } from '@angular/core';
import { AuthService } from '../../../shared/service/auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  msgError: string = '';
  isLoading: boolean = false;

  registerForm: FormGroup = new FormGroup({
    user_National_ID: new FormControl('', [Validators.required]),
    fullName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    userName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.pattern(/^[A-Z][A-Za-z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{6,20}$/),Validators.minLength(8)],),
    confirmPassword: new FormControl('', [Validators.required, Validators.pattern(/^[A-Z][A-Za-z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{6,20}$/),Validators.minLength(8)]),
    phoneNumber: new FormControl('', [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]),
    birthDate: new FormControl('', [Validators.required]),
    gender: new FormControl('', [Validators.required])
  });




  constructor(private _AuthService: AuthService, private _Router: Router) {
  }
  onGenderChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.registerForm.patchValue({
      gender: +target.value  // Convert string value to number
    });
  }


  handleForm(): void {
    if (this.registerForm.valid) {
      console.log(this.registerForm.value);
      this.isLoading = true;
      this._AuthService.setRegister(this.registerForm.value).subscribe({
        next: (response) => {
          console.log(response)
          if (response.message === 'Registered successfully') {
            this.isLoading = false;
           this._Router.navigate(['/login']);

          }
        },
        error: (err: HttpErrorResponse) => {
          this.isLoading = false;
          this.msgError = err.error.message;
          console.log(err.error.message);
        }
      });
    }
  }

}
