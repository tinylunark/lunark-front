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
import {AccountService} from "../../account/account.service";
import {Router} from "@angular/router";
import { MatDialog } from '@angular/material/dialog';
import { ReportDialogComponent } from '../../report-dialog/report-dialog.component';

@Component({
  selector: 'app-host-incoming-reservations',
  templateUrl: './host-incoming-reservations.component.html',
  styleUrl: './host-incoming-reservations.component.css'
})
export class HostIncomingReservationsComponent {
  properties: Property[] = [];
  reservations: Reservation[] = [];
  placeholderImage = environment.assetsDir + '/images/placeholder-image.webp';
  profile: Profile | null = null;
  images: Map<number, string> = new Map;
  currentDate = new Date();

  constructor(
    private reservationService: ReservationService,
    private profileService: ProfileService,
    private propertyService: PropertyService,
    private sharedService: SharedService,
    public accountService: AccountService,
    private router: Router,
    private matDialog: MatDialog
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



  acceptReservation(reservation: Reservation): void {
    this.reservationService.acceptReservation(reservation)
      .subscribe({
        next: (_) => {
          this.getReservations();
          this.sharedService.openSnack('Reservation accepted.');
        }
      })
  }

  declineReservation(reservation: Reservation): void {
    this.reservationService.declineReservation(reservation)
      .subscribe({
        next: (_) => {
          this.getReservations();
          this.sharedService.openSnack('Reservation declined.');
          this.getReservations();
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

  onReservationsEmitted(reservations: Reservation[]) {
    this.reservations = reservations;
    reservations.forEach(reservation => this.getImages(reservation.property.id));
  }

  report(guestId: number) {
    this.matDialog.open(ReportDialogComponent, {
      backdropClass: "backdropBackground",
      data: {
        reportedUserId: guestId,
        title: "Report guest"
      }
      }).afterClosed().subscribe((reported: boolean) => {
        if (reported) {
          this.getReservations();
        }
      });
  }
}
