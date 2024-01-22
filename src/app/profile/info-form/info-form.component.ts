import { Component, Input, OnInit, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Profile } from '../../shared/models/profile.model';

@Component({
  selector: 'app-info-form',
  templateUrl: './info-form.component.html',
  styleUrls: ['./info-form.component.css']
})
export class InfoFormComponent implements OnChanges {
  @Output() profileChange = new EventEmitter<Profile>();
  @Output() validChange = new EventEmitter<boolean>();

  @Input() profile!: Profile;
  @Input() valid: boolean = false;

  infoForm = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z0-9 ]+')]),
    lastName: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z0-9 ]+')], ),
    email: new FormControl('', [
      Validators.required,
        Validators.pattern( "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$"),
     ]),
    phoneNumber: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z0-9 ]+')]),
    address: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z0-9 ]+')])
  });

  ngOnChanges(): void {
    if (!this.profile) { return; }

    this.infoForm.setValue({
      firstName: this.profile.name || '',
      lastName: this.profile.surname || '',
      email: this.profile.email || '',
      phoneNumber: this.profile.phoneNumber || '',
      address: this.profile.address || ''
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

