import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormControl} from "@angular/forms";
import {ReservationService} from "../../reservation.service";
import {Reservation, ReservationStatus} from "../../../shared/models/reservation.model";

@Component({
  selector: 'app-reservation-search',
  templateUrl: './reservation-search.component.html',
  styleUrl: './reservation-search.component.css'
})
export class ReservationSearchComponent {

  filterForm = this.formBuilder.group({
    propertyName: '',
    startDate: new FormControl<Date | null>(null),
    endDate: new FormControl<Date | null>(null),
    status: ReservationStatus.NONE,
  });

  @Output() reservationsEmitter = new EventEmitter<Reservation[]>;

  constructor(
    private reservationService: ReservationService,
    private formBuilder: FormBuilder,
  ) {
  }

  onSubmit() {
    this.reservationService.getReservationsForCurrentUser({
      propertyName: this.filterForm.value.propertyName ?? '',
      startDate: this.filterForm.value.startDate?.toISOString().substring(0, 10) ?? '',
      endDate: this.filterForm.value.endDate?.toISOString().substring(0, 10) ?? '',
      status: this.filterForm.value.status ?? ReservationStatus.NONE,
    }).subscribe(reservations => {
      this.reservationsEmitter.emit(reservations);
    });
  }

  protected readonly ReservationStatus = ReservationStatus;
  protected readonly Object = Object;
}
