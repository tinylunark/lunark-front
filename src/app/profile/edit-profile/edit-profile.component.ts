import { Component, OnInit } from '@angular/core';
import { Profile } from '../../shared/models/profile.model';
import { ProfileService } from './profile.service';
import { Router } from '@angular/router';
import { SharedService } from '../../shared/shared.service';
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
    private sharedService: SharedService
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
      this.profileService.deleteProfile().subscribe(
        () => {
          console.log('Profile deleted successfully');
          localStorage.removeItem(environment.userLocalStorageKey);
          this.router.navigate(['/home']);
        },
        (error) => {
          console.error('Error deleting profile:', error);
        }
      );
    } else {
      console.error('Profile not found');
    }
  }
}

