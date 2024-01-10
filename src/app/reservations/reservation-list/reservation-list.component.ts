import {Component} from '@angular/core';
import {PropertyService} from "../../properties/property.service";
import {ReservationService} from "../reservation.service";
import {ProfileService} from "../../shared/profile.service";
import {SharedService} from "../../shared/shared.service";
import {Property} from "../../shared/models/property.model";
import {Reservation, ReservationStatus} from "../../shared/models/reservation.model";
import {Profile} from "../../shared/models/profile.model";
import {environment} from "../../../env/environment";
import {switchMap} from 'rxjs/operators';
import {FormBuilder} from "@angular/forms";
import {AccountService} from "../../account/account.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrl: './reservation-list.component.css'
})
export class ReservationListComponent {
  properties: Property[] = [];
  reservations: Reservation[] = [];
  placeholderImage = environment.assetsDir + '/images/placeholder-image.webp';
  profile: Profile | null = null;
  images: Map<number, string> = new Map;

  constructor(
    private reservationService: ReservationService,
    private profileService: ProfileService,
    private propertyService: PropertyService,
    private sharedService: SharedService,
    public accountService: AccountService,
    private snackBar: MatSnackBar,
  ) {
  }

  ngOnInit(): void {
    this.getReservations();
  }

  getReservations(): void {
    this.reservationService.getReservationsForCurrentUser()
      .subscribe(reservations => {
        this.reservations = reservations;
        reservations.forEach(reservation => this.getImages(reservation.property.id));
      });
  }

  getImages(propertyId: number) {
    this.propertyService.getProperty(propertyId).pipe(
      switchMap((property: Property) => {
        const firstImage = property.images.at(0);
        if (firstImage) {
          return this.propertyService.getImage(firstImage.id, propertyId);
        } else {
          throw new Error('No image found for the property.');
        }
      })
    ).subscribe({
      next: (image: any) => {
        const imageUrl = URL.createObjectURL(image);
        console.log("Generated Image URL:", imageUrl);
        this.images.set(propertyId, imageUrl);
      },
      error: (error) => {
        console.log('Error fetching image.', error);
      }
    });
  }


  cancelReservation(reservation: Reservation): void {
    this.reservationService.cancelReservation(reservation)
      .subscribe({
        next: (_) => {
          this.getReservations();
          this.sharedService.openSnack('Reservation canceled.');
        },
        error: (_) => {
          this.sharedService.openSnack('Reservation can not be canceled.');
        }
      })
  }

  formatDate(date: Date): string {
    if (date) {
      const day = this.formatNumber(date.getDate());
      const month = this.formatNumber(date.getMonth() + 1);
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    }
    return '';
  }

  formatNumber(num: number): string {
    return num < 10 ? `0${num}` : `${num}`;
  }

  protected readonly Object = Object;
  protected readonly ReservationStatus = ReservationStatus;

  onReservationsEmitted(reservations: Reservation[]) {
    this.reservations = reservations;
    reservations.forEach(reservation => this.getImages(reservation.property.id));
  }

  protected readonly console = console;

  deleteReservation(id: number) {
    this.reservationService.deleteReservation(id)
      .subscribe(
        () => {
          this.snackBar.open("Reservation has been deleted.", "OK", {duration: 3000});
          this.getReservations();
        },
        () => this.snackBar.open("Failed to delete reservation.", "OK", {duration: 3000}),
      )
  }
}
