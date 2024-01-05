import { Component } from '@angular/core';
import { PropertyService } from "../../properties/property.service";
import { ReservationService } from "../reservation.service";
import { ProfileService } from "../../shared/profile.service";
import { SharedService } from "../../shared/shared.service";
import { Property } from "../../shared/models/property.model";
import { Reservation } from "../../shared/models/reservation.model";
import { Profile } from "../../shared/models/profile.model";
import { environment } from "../../../env/environment";
import { forkJoin } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

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
  ) {
  }

 ngOnInit(): void {
    this.getReservations();
  }

  getReservations() : void {
    // this.profileService.getProfile().pipe(
    //   switchMap((profile: Profile) => {
    //     this.profile = profile;
    //     return this.reservationService.getAcceptedReservations(this.profile.id);
    //   }),
    //   switchMap((reservations: Reservation[]) => {
    //     const observables = reservations.map(reservation => {
    //       const propertyObservable = this.propertyService.getProperty(reservation.propertyId);
    //       const guestObservable = this.profileService.getProfileById(reservation.guestId);
    //       return forkJoin([propertyObservable, guestObservable]).pipe(
    //         map(results => {
    //           reservation.property = results[0];
    //           reservation.guest = results[1];
    //           if (reservation.property && typeof reservation.property.id === 'number') {
    //             this.getImages(reservation.property.id);
    //           }
    //           return reservation;
    //         })
    //       );
    //     });
    //     return forkJoin(observables);
    //   })
    // ).subscribe({
    //   next: (reservations: Reservation[]) => {
    //     this.reservations = reservations;
    //   },
    //   error: (err) => {
    //     console.log('Error fetching reservations.', err);
    //   }
    // });
    this.reservationService.getReservationsForCurrentUser()
      .subscribe(reservations => this.reservations = reservations);
  }

  getImages(propertyId: any): void {
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

}
