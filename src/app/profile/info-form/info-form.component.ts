import { Component, Input, OnInit, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Profile } from '../../shared/models/profile.model';

@Component({
  selector: 'app-info-form',
  templateUrl: './info-form.component.html',
  styleUrls: ['./info-form.component.css'],
  providers: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
})
export class InfoFormComponent  {
  @Output() profileChange = new EventEmitter<Profile>();
  @Input() profile!: Profile;

  infoForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phoneNumber: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    country: new FormControl('', [Validators.required]),
    birthday: new FormControl(undefined, [Validators.required]),
  });

  onFormChange(): void {
    const updatedProfile: Profile = {
      name: this.infoForm.get('firstName')?.value || '',
      surname: this.infoForm.get('lastName')?.value || '',
      email: this.infoForm.get('email')?.value || '',
      birthday: this.infoForm.get('birthday')?.value || undefined,
      phoneNumber: this.infoForm.get('phoneNumber')?.value || '',
      address: this.infoForm.get('address')?.value || '',
      country: this.infoForm.get('country')?.value || '',
    };

    this.profile = updatedProfile;
    this.profileChange.emit(this.profile);
  }
}
