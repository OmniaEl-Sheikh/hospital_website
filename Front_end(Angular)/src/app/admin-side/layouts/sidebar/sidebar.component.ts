import { Component } from '@angular/core';
import { AuthService } from '../../../shared/service/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  constructor(private _AuthService:AuthService){}
  name:any=this._AuthService.name
  auth:any=this._AuthService.auth
  

}
