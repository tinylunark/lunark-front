import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Profile } from '../../shared/models/profile.model';

@Component({
  selector: 'app-basic-info',
  templateUrl: './basic-info.component.html',
  styleUrls: ['./basic-info.component.css']
})
export class BasicInfoComponent {
  @Input() profile: Profile | undefined = undefined;
  @Output() profileChange = new EventEmitter<Profile>();

  profileImage: string = '../../../assets/jake-gyllenhaal.jpg';

  handleFileChange(event: any): void {
    const fileInput = event.target;
    const file = fileInput.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.profileImage = e.target.result;
        this.profileChange.emit(this.profile); // Emit the updated profile
      };
      reader.readAsDataURL(file);
    }

    this.profileChange.emit(this.profile);
  }
}

