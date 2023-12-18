import { Injectable } from '@angular/core';
import ReservationRequestDto from "./properties/property-detail/dtos/reservation-request.dto";
import {HttpClient} from "@angular/common/http";
import {environment} from "../env/environment";
import {ApiPaths} from "./shared/api/api-paths.enum";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(
    private http: HttpClient,
  ) { }

  createReservation(reservationDto: ReservationRequestDto): Observable<any> {
    return this.http.post(`${environment.apiHost}/${ApiPaths.Reservations}`, reservationDto);
  }
}
