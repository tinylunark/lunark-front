import {Component} from '@angular/core';
import {PropertyService} from "../property.service";
import {Property} from "../../shared/models/property.model";
import {environment} from "../../../env/environment";
import {first} from "rxjs";

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrl: './properties.component.css'
})
export class PropertiesComponent {
  properties: Property[] = [];
  placeholderImage = environment.assetsDir + '/images/placeholder-image.webp';
  images: Map<number, string> = new Map;

  constructor(private propertyService: PropertyService) {
  }

  ngOnInit(): void {
    this.getProperties();
  }

  getProperties(): void {
    this.propertyService.getProperties()
      .subscribe(properties => {
        this.properties = properties;
        this.getImages();
      });
  }

  /** Gets the first image of each property */
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
}
