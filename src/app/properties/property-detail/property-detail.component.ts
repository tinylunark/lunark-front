import {Component} from '@angular/core';
import {Property} from "../../shared/models/property.model";
import {PropertyService} from "../property.service";
import {ActivatedRoute} from "@angular/router";
import {environment} from "../../../env/environment";
import {take} from "rxjs";
import {AccountService} from "../../account/account.service";
import {ReservationService} from "../../reservation.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import ReservationRequestDto from "./dtos/reservation-request.dto";

@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrl: './property-detail.component.css'
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

  constructor(
    private propertyService: PropertyService,
    private route: ActivatedRoute,
    private accountService: AccountService,
    private reservationService: ReservationService,
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

    this.reservationService.createReservation(reservationDto);
  }
}
