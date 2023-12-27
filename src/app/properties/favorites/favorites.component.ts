import { Component } from '@angular/core';
import {AccountService} from "../../account/account.service";
import {Property} from "../../shared/models/property.model";
import {environment} from "../../../env/environment";
import {PropertyService} from "../property.service";

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.css'
})
export class FavoritesComponent {
  favorites?: Property[]
  placeholderImage = environment.assetsDir + '/images/placeholder-image.webp';
  images: Map<number, string> = new Map;

  constructor(
    private propertyService: PropertyService,
    private accountService: AccountService,
  ) {
  }

  ngOnInit() {
    this.getFavorites();
  }

  getFavorites() {
    this.accountService.getFavoriteProperties()
      .subscribe(favorites => {
        this.favorites = favorites;
        this.getImages();
      });
  }

  getImages(): void {
    if (!this.favorites) return;

    this.favorites.forEach(property => {
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

  toggleFavorite(isChecked: boolean, propertyId: number) {
    if (isChecked) {
      this.accountService.addFavoriteProperty(propertyId)
        .subscribe((_) => { });
    } else {
      this.accountService.deleteFavoriteProperty(propertyId)
        .subscribe((_) => { });
    }
  }
}
