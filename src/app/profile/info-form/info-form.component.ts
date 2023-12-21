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
export class InfoFormComponent  implements OnChanges {
  @Output() profileChange = new EventEmitter<Profile>();
  @Output() validChange = new EventEmitter<boolean>();

  @Input() profile!: Profile;
  @Input() valid: boolean = false;

  infoForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phoneNumber: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
  });



  ngOnChanges(): void {
    if (!this.profile) { return; }

    this.infoForm.setValue({
      firstName: this.profile.name || '',
      lastName: this.profile.surname || '',
      email: this.profile.email || '',
      phoneNumber: this.profile.phoneNumber || '',
      address: this.profile.address || '',
    });

    this.infoForm.valueChanges.subscribe((value) => {
      this.profile.name = value.firstName || '';
      this.profile.surname = value.lastName || '';
      this.profile.email = value.email || '';
      this.profile.phoneNumber = value.phoneNumber || '';
      this.profile.address = value.address || '';

      this.setValid();
      this.profileChange.emit(this.profile);
    });

  }

  private setValid(): void {
    this.valid = this.infoForm.valid;
    this.validChange.emit(this.valid);
  }

}
