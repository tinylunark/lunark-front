import {Component} from '@angular/core';
import {PropertyService} from "../property.service";
import {Property} from "../../shared/models/property.model";
import {environment} from "../../../env/environment";
import PropertiesSearchDto from "../properties-search.dto";

@Component({
  selector: 'app-property-approval',
  templateUrl: './property-approval.component.html',
  styleUrl: './property-approval.component.css'
})
export class PropertyApprovalComponent {
  properties: Property[] = [];
  placeholderImage = environment.assetsDir + '/images/placeholder-image.webp';
  images: Map<number, string> = new Map;

  constructor(private propertyService: PropertyService) {
  }

  ngOnInit(): void {
    this.getProperties();
  }

  approveProperty(property: Property): void {
    this.propertyService.approveProperty(property)
    .subscribe({
        next:  (_) => {
          this.getProperties();
        }
      })
  }

  getProperties(): void {
    this.propertyService.getUnapprovedProperties()
      .subscribe(properties => {
        this.properties = properties;
        this.getImages();
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
}
