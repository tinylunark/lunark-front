import { Component } from '@angular/core';
import {AccountService} from "../../account/account.service";
import {Property} from "../../shared/models/property.model";

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.css'
})
export class FavoritesComponent {
  favorites?: Property[]

  constructor(
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
        console.log(favorites);
      });
  }
}
