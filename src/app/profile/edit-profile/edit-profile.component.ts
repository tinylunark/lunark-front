import { Component, OnInit } from '@angular/core';
import { Profile } from '../../shared/models/profile.model';
import { ProfileService } from './profile.service';
import { Router } from '@angular/router';
import { environment } from '../../../env/environment';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  profile: Profile | null;

  constructor(
    private profileService: ProfileService,
    private router: Router
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
    if (this.profile) {
      this.profileService.updateProfile(this.profile).subscribe({
        next: (_) => {
          console.log("konzolugujem");
        }
      }
      );
    } else {
      console.error('Profile not found');
    }
  }


  onProfileChange(updatedProfile: Profile | null): void {
    this.profile = updatedProfile;
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

