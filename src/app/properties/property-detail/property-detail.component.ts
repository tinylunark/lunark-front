import {Component} from '@angular/core';
import {Property} from "../../shared/models/property.model";
import {PropertyService} from "../property.service";
import {ActivatedRoute} from "@angular/router";
import {environment} from "../../../env/environment";
import {AccountService} from "../../account/account.service";
import {ReservationService} from "../../reservation.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import ReservationRequestDto from "./dtos/reservation-request.dto";
import {MatSnackBar} from "@angular/material/snack-bar";
import { ReviewService } from '../../reviews/review.service';
import { PropertyReviewService } from '../../reviews/property-review.service';
import { ApiPaths } from '../../shared/api/api-paths.enum';

@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrl: './property-detail.component.css',
  providers: [{ provide: ReviewService, useClass: PropertyReviewService }]
})
export class PropertyDetailComponent {
  property?: Property;
  placeholderImage = environment.assetsDir + '/images/placeholder-image.webp';
  images: string[] = [];
  reservationFormGroup: FormGroup = new FormGroup({
    startDate: new FormControl('', [Validators.required]),
    endDate: new FormControl('', [Validators.required]),
    numberOfGuests: new FormControl('', [Validators.required]),
  })
  averageRating?: number;
  entryISODates?: string[];

  price = 0;
  reportingAllowed = false;

  dateFilter = (d: Date | null): boolean => {
    return (this.entryISODates?.includes(d?.toISOString() ?? '') ?? false) && !((d ?? new Date()) <= new Date());
  };

  constructor(
    private propertyService: PropertyService,
    private route: ActivatedRoute,
    private accountService: AccountService,
    private reservationService: ReservationService,
    private snackBar: MatSnackBar,
  ) {
  }

  ngOnInit(): void {
    this.getProperty();
  }

  getProperty(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.propertyService.getProperty(id)
      .subscribe(property => {
        this.property = property;
        this.getImages();
        this.entryISODates = property.availabilityEntries
          .filter(entry => !entry.reserved)
          .map(entry => entry.date.toISOString());
        this.calculateAverageRating();
        this.reportingAllowed = this.accountService.getAccountId() === property.host?.id;
      });
  }

  protected readonly Array = Array;
  protected readonly environment = environment;

  /** Gets images for property */
  getImages(): void {
    const propertyId = this.property?.id;
    if (!propertyId) return;

    this.property?.images.forEach(image => {
      this.propertyService.getImage(image.id, propertyId)
        .subscribe(image => {
          const imageUrl = URL.createObjectURL(image);
          this.images?.push(imageUrl);
        });
    });
  }

  getRole(): string {
    return this.accountService.getRole();
  }

  createReservation(): void {
    if (!this.reservationFormGroup.valid || !this.property) return;

    const reservationDto: ReservationRequestDto = {
      propertyId: this.property.id,
      ...this.reservationFormGroup.value,
    }

    this.reservationService.createReservation(reservationDto)
      .subscribe(
        () => this.snackBar.open('Reservation has been created.', 'OK'),
        () => this.snackBar.open('Failed to create reservaiton.', 'OK'),
      );
  }

  calculatePrice(): void {
    let sum = 0;
    const startDate: Date = this.reservationFormGroup.controls['startDate'].value;
    const endDate: Date = this.reservationFormGroup.controls['endDate'].value;

    this.property?.availabilityEntries.forEach(entry => {
      if (entry.date < startDate || entry.date > endDate) return;

      sum += entry.price;
    });

    this.price = sum;
  }

  calculateAverageRating() {
    if (!this.property || !this.property.reviews || this.property.reviews.length <= 0) {
      return;
    }
    this.propertyService.getAverageRating(this.property.id).subscribe(
      (averageRating: number) => {
        this.averageRating = averageRating;
      }
    );
  }
}
