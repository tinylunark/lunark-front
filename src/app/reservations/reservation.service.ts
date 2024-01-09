import {Injectable} from '@angular/core';
import {Observable, forkJoin} from "rxjs";
import {Property} from "../shared/models/property.model";
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../env/environment";
import {ApiPaths} from "../shared/api/api-paths.enum";
import PropertiesSearchDto from "../properties/properties-search.dto";
import {Router, UrlSerializer} from "@angular/router";
import { Reservation } from '../shared/models/reservation.model';
import PropertyAvailabilityEntry from '../shared/models/property-availability-entry.model';
import PropertyRequest from '../shared/models/property-request.model';
import ReservationSearchDto from "./reservation-list/reservation-search.dto";

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(
    private http: HttpClient,
    private router: Router,
    private serializer: UrlSerializer,
  ) { }

  getProperties(searchDto?: PropertiesSearchDto): Observable<Property[]> {
    let url = `${environment.apiHost}/${ApiPaths.Properties}`;

    if (searchDto) {
      const adaptedSearchDto = {
        ...searchDto,
        startDate: searchDto?.startDate?.toISOString(),
        endDate: searchDto?.endDate?.toISOString(),
      }

      const tree = this.router.createUrlTree([], { queryParams: adaptedSearchDto });
      let params = this.serializer.serialize(tree);

      if (params.indexOf('?') !== -1) {
        params = params.slice(params.indexOf('?'));
        url = `${url}${params}`;
      }
    }

    return this.http.get<Property[]>(url);
  }

  getMyProperties(hostId: any): Observable<Property[]> {
    let url = `${environment.apiHost}/${ApiPaths.Properties}/${ApiPaths.MyProperties}`;
    const params = new HttpParams().set('hostId', hostId);
    return this.http.get<Property[]>(url, { params });
  }

  getIncomingReservations(hostId: any): Observable<Reservation[]> {
    let url = `${environment.apiHost}/${ApiPaths.Reservations}/${ApiPaths.IncomingReservations}`;
    const params = new HttpParams().set('hostId', hostId);
    return this.http.get<Reservation[]>(url, { params });
  }

  getAcceptedReservations(guestId: any): Observable<Reservation[]> {
    let url = `${environment.apiHost}/${ApiPaths.Reservations}/${ApiPaths.AcceptedReservations}`;
    const params = new HttpParams().set('guestId', guestId);
    return this.http.get<Reservation[]>(url, { params });
  }

  acceptReservation(reservation: Reservation): Observable<Reservation> {
    return this.http.post<Reservation>(`${environment.apiHost}/${ApiPaths.Reservations}/accept/${reservation.id}`, {});
  }

  declineReservation(reservation: Reservation): Observable<Reservation> {
    return this.http.post<Reservation>(`${environment.apiHost}/${ApiPaths.Reservations}/reject/${reservation.id}`, {});
  }

  cancelReservation(reservation: Reservation): Observable<Reservation> {
    return this.http.post<Reservation>(`${environment.apiHost}/${ApiPaths.Reservations}/cancel/${reservation.id}`, {});
  }

  uploadImages(propertyId: number, images: File[]): Observable<Object[]> {
    const imageUploads = [];
    for (const image of images) {
      const formData = new FormData();
      formData.append('image', image);
      imageUploads.push(this.http.post(`${environment.apiHost}/${ApiPaths.Properties}/${propertyId}/images`, formData));
    }
    return forkJoin(imageUploads);
  }

  getImage(imageId: number, propertyId: number): Observable<Blob> {
    return this.http.get(`${environment.apiHost}/${ApiPaths.Properties}/${propertyId}/images/${imageId}`,
      {responseType: 'blob'});
  }

  getReservationsForCurrentUser(filter?: ReservationSearchDto) {
    return this.http.get<Reservation[]>(`${environment.apiHost}/${ApiPaths.Reservations}/current`, {
      params: {
        ...filter
      }
    });
  }

  deleteReservation(id: number) {
    return this.http.delete(`${environment.apiHost}/${ApiPaths.Reservations}/${id}`);
  }
}
