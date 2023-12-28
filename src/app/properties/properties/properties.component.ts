import {Component} from '@angular/core';
import {PropertyService} from "../property.service";
import {Property} from "../../shared/models/property.model";
import {environment} from "../../../env/environment";
import PropertiesSearchDto from "../properties-search.dto";
import {AccountService} from "../../account/account.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrl: './properties.component.css'
})
export class PropertiesComponent {
  properties: Property[] = [];
  placeholderImage = environment.assetsDir + '/images/placeholder-image.webp';
  images: Map<number, string> = new Map;
  startDate?: Date;
  endDate?: Date;
  favoritePropertyIds?: number[]; // We only need ids to know if the favorite button should be filled or not

  constructor(
    private propertyService: PropertyService,
    public accountService: AccountService,
    private snackBar: MatSnackBar,
    ) {
  }

  ngOnInit(): void {
    this.getProperties();
    this.getFavoriteProperties();
  }

  getProperties(searchDto?: PropertiesSearchDto): void {
    this.startDate = searchDto?.startDate;
    this.endDate = searchDto?.endDate;
    this.propertyService.getProperties(searchDto)
      .subscribe(properties => {
        this.properties = properties;
        this.getImages();
      });
  }

  getFavoriteProperties(): void {
    if (this.accountService.getRole() !== 'GUEST') return;
    this.accountService.getFavoriteProperties()
      .subscribe(favorites => {
        this.favoritePropertyIds = favorites.map(favorite => favorite.id);
      });
  }

  isFavoriteProperty(id: number): boolean | undefined {
    return this.favoritePropertyIds?.includes(id);
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

  // TODO: This method is copied from property-detail, find a nicer way...
  calculatePrice(property: Property): number {
    let sum = 0;

    if (!this.startDate || !this.endDate) return 0;

    property?.availabilityEntries.forEach(entry => {
      if (entry.date < this.startDate! || entry.date > this.endDate!) return;

      sum += entry.price;
    });

    return sum;
  }

  toggleFavorite(isChecked: boolean, propertyId: number) {
    if (isChecked) {
      this.accountService.addFavoriteProperty(propertyId).subscribe((_) => { });
    } else {
      this.accountService.deleteFavoriteProperty(propertyId).subscribe((_) => { });
    }
  }
}
