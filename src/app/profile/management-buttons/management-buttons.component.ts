import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Profile } from '../../shared/models/profile.model';
import { ProfileService } from '../../shared/profile.service';

@Component({
  selector: 'app-management-buttons',
  templateUrl: './management-buttons.component.html',
  styleUrls: ['./management-buttons.component.css'],
})
export class ManagementButtonsComponent {
  @Input() profile: Profile | undefined = undefined;
  @Output() saveClick = new EventEmitter<void>();

  constructor(private profileService: ProfileService) {}

  onSaveClick(): void {
    this.saveClick.emit();
  }
}

