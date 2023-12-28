import {Component, Input, Output, EventEmitter} from '@angular/core';
import {Profile} from '../../shared/models/profile.model';
import {AccountService} from "../../account/account.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-basic-info',
  templateUrl: './basic-info.component.html',
  styleUrls: ['./basic-info.component.css']
})
export class BasicInfoComponent {
  @Input() profile: Profile | undefined = undefined;
  @Output() profileChange = new EventEmitter<Profile>();

  profileImage: string = '';

  constructor(
    private accountService: AccountService,
    private snackBar: MatSnackBar,
  ) {
  }

  ngOnInit(): void {
    this.getProfileImage();
  }

  onFileChange(event: any) {
    const fileInput = event.target;
    const file = fileInput.files[0];

    if (file) {
      this.accountService.updateProfileImage(file)
        .subscribe(() => {
          this.snackBar.open('Profile image updated', 'OK', {duration: 3000})
          this.getProfileImage();
          this.profileChange.emit(this.profile);
        });
    }
  }

  getProfileImage() {
    this.accountService.getProfileImage()
      .subscribe(image => {
        const imageUrl = URL.createObjectURL(image);
        this.profileImage = imageUrl;
      })
  }
}

