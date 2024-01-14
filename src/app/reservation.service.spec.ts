import {TestBed} from '@angular/core/testing';

import {ReservationService} from './reservation.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {Reservation, ReservationStatus} from "./shared/models/reservation.model";

describe('ReservationService', () => {
  let service: ReservationService;
  let httpController: HttpTestingController;

  const url = 'http://localhost:8080/api/reservations';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(ReservationService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create a reservation', () => {
    const mockReservation: Partial<Reservation> = {
      id: 1,
      propertyId: 1,
      startDate: new Date('2024-05-05'),
      endDate: new Date('2024-05-10'),
      numberOfGuests: 3
    };

    service.createReservation({
      propertyId: mockReservation.propertyId!,
      startDate: mockReservation.startDate!,
      endDate: mockReservation.endDate!,
      numberOfGuests: mockReservation.numberOfGuests!
    }).subscribe(res => {
      expect(res).toEqual(mockReservation);
      expect(res.id).toEqual(1);
    });

    const req = httpController.expectOne({
      method: 'POST',
      url
    });

    req.flush(mockReservation);
  });

  afterEach(() => {
    httpController.verify();
  });
});
