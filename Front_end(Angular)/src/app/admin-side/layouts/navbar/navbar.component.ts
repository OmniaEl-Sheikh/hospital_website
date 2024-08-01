import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../../../shared/service/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(private _AuthService:AuthService){}

  @Output() toggleSideBarForMe: EventEmitter<any> = new EventEmitter();

  toggleSideBar() {
    this.toggleSideBarForMe.emit();
    setTimeout(() => {
      window.dispatchEvent(
        new Event('resize')
      );
    }, 300);
  }

  logout()
  {
    this._AuthService.logout()

  }

}
