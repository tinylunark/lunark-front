import { Component, Input, OnInit } from '@angular/core';
import { ApiPaths } from '../../shared/api/api-paths.enum';
import { environment } from '../../../env/environment';

@Component({
  selector: 'app-profile-image',
  templateUrl: './profile-image.component.html',
  styleUrl: './profile-image.component.css'
})
export class ProfileImageComponent implements OnInit {
  @Input() id: number;
  profileImageURL?: string;

  ngOnInit(): void {
      this.profileImageURL = `${environment.apiHost}/${ApiPaths.Profile}/${this.id}/profile-image`;
  }

}
