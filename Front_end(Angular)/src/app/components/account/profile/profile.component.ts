import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditProfileDialogComponent } from '../edit-profile-dialog/edit-profile-dialog.component';
import { AllService } from '../../../shared/service/all.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any;
  userFields: any[] = [];

  constructor(public dialog: MatDialog, private userService: AllService) { }

  ngOnInit(): void {
    this.getUserData();
  }

  getUserData() {
    this.userService.getByIdAll().subscribe(data => {
      this.user = data;
      this.setUserFields(data);
    });
  }

  editDialog() {
    const dialogRef = this.dialog.open(EditProfileDialogComponent, {
      width: '40%',
      data: { ...this.user } // Pass user data to the dialog
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if (result === 'success') {
        this.getUserData();
      }
    });
  }

  formatDate(dateString: string): string {
    if (!dateString) return '';

    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      const parts = dateString.split('T')[0].split('-');
      if (parts.length === 3) {
        const year = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10) - 1;
        const day = parseInt(parts[2], 10);
        return new Date(year, month, day).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
      }
      return dateString;
    }

    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    return date.toLocaleDateString('en-US', options);
  }

  setUserFields(user: any) {
    this.userFields = [
      { label: 'User National ID', value: user.user_National_ID },
      { label: 'Email', value: user.email },
      { label: 'Phone', value: user.phone },
      { label: 'Gender', value: user.gender === 0 ? 'Male' : 'Female' },
      { label: 'Birthdate', value: this.formatDate(user.birthDate) },
      { label: 'Full Name', value: user.fullName },
      { label: 'City', value: user.city },
      { label: 'Street', value: user.street },
      { label: 'Password', value: user.password },
      { label: 'Building Number', value: user.building_Number },
    ];
  }
}
