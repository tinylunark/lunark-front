import { Component, OnInit } from '@angular/core';
import { Profile } from '../../shared/models/profile.model';
import { ProfileService } from '../../shared/profile.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { SharedService } from '../../shared/shared.service';
import { AccountService } from '../../account/account.service';
import { DeleteProfileDialogComponent } from '../delete-profile-dialog/delete-profile-dialog.component';
import { environment } from '../../../env/environment';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  profile: Profile | null = null;
  valid: boolean = false;

  constructor(
    private profileService: ProfileService,
    private router: Router,
    private sharedService: SharedService,
    private accountService: AccountService,
    private matDialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.profileService.getProfile().subscribe({
      next: (data: Profile | null) => {
        this.profile = data;
        console.log(this.profile);
      }
    });
  }

  onSaveClick(): void {
    if (this.profile && this.valid) {
      this.profileService.updateProfile(this.profile).subscribe({
        next: (_) => {
          this.sharedService.openSnack('Profile updated successfully');
        }
      }
      );
    } else if (!this.valid) {
      this.sharedService.openSnack('Please fill in all required fields');
    }
    else {
      console.error('Profile not found');
    }
  }


  onProfileChange(updatedProfile: Profile | null): void {
    this.profile = updatedProfile;
  }

  onValidChange(valid: boolean) : void {
    this.valid = valid;

  }

  onCancelClick(): void {
    this.router.navigate(['/home']);
  }

  onDeleteClick(): void {
    if (this.profile) {
      this.profileService.deleteProfile().subscribe({
        next: (_) => {
          localStorage.removeItem(environment.userLocalStorageKey);
          this.accountService.setUser();
          const dialogRef = this.matDialog.open(DeleteProfileDialogComponent, { backdropClass: 'backdropBackground', });
          dialogRef.afterClosed().subscribe(() => { this.router.navigate(['/my-properties']); });
        },
        error: (error) => {
          console.log(error);
        }
      });
    } else {
      console.error('Profile not found');
    }
  }
}

