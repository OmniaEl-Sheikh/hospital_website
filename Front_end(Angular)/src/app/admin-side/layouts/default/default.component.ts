import { Component } from '@angular/core';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrl: './default.component.css'
})
export class DefaultComponent {
  sideBarOpen = true;

  
  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }

}
