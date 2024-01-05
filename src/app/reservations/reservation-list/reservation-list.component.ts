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
import {FormBuilder, FormControl} from "@angular/forms";

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

  filterForm = this.formBuilder.group({
    propertyName: '',
    startDate: new FormControl<Date | null>(null),
    endDate: new FormControl<Date | null>(null),
    status: ReservationStatus.NONE,
  });

  constructor(
    private reservationService: ReservationService,
    private profileService: ProfileService,
    private propertyService: PropertyService,
    private sharedService: SharedService,
    private formBuilder: FormBuilder,
  ) {
  }

 ngOnInit(): void {
    this.getReservations();
  }

  getReservations() : void {
    this.reservationService.getReservationsForCurrentUser()
      .subscribe(reservations =>
      {
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

  onSubmit() {
    this.reservationService.getReservationsForCurrentUser({
      propertyName: this.filterForm.value.propertyName ?? '',
      startDate: this.filterForm.value.startDate?.toISOString().substring(0, 10) ?? '',
      endDate: this.filterForm.value.endDate?.toISOString().substring(0, 10) ?? '',
      status: this.filterForm.value.status ?? ReservationStatus.NONE,
    }).subscribe(reservations => {
      this.reservations = reservations;
      reservations.forEach(reservation => this.getImages(reservation.property.id));
    });
  }

  protected readonly Object = Object;
  protected readonly ReservationStatus = ReservationStatus;
}
