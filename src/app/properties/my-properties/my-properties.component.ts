import { Component } from '@angular/core';
import { PropertyService } from "../property.service";
import { ProfileService } from "../../shared/profile.service";
import { Profile } from "../../shared/models/profile.model";
import { Property } from "../../shared/models/property.model";
import { environment } from "../../../env/environment";

@Component({
  selector: 'app-my-properties',
  templateUrl: './my-properties.component.html',
  styleUrl: './my-properties.component.css'
})
export class MyPropertiesComponent {
  properties: Property[] = [];
  placeholderImage = environment.assetsDir + '/images/placeholder-image.webp';
  images: Map<number, string> = new Map;

  constructor(private propertyService: PropertyService,
              private profileService: ProfileService
  ) {
  }

  profile: Profile | null = null;
  ngOnInit(): void {
    this.profileService.getProfile().subscribe({ next: (data: Profile) => {
      this.profile = data;
      console.log(this.profile.id);
      this.getProperties(this.profile.id);
    } });
  }


  getProperties(hostId: any): void {
    this.propertyService.getMyProperties(hostId)
      .subscribe({
        next: (properties) => {
          this.properties = properties;
          this.getImages();
        }
      });
  }

  getImages(): void {
    this.properties.forEach(property => {
      const firstImage = property.images.at(0);
      if (firstImage) {
        this.propertyService.getImage(firstImage.id, property.id)
          .subscribe(image => {
            const imageUrl = URL.createObjectURL(image);
            this.images.set(property.id, imageUrl);
          });
      }
    });
  }

  setProfle(profile: Profile): void {
    this.profile = profile;
  }
}
