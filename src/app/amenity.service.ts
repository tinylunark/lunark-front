import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import Amenity from "./shared/models/amenity.model";
import {Property} from "./shared/models/property.model";
import {environment} from "../env/environment";
import {ApiPaths} from "./shared/api/api-paths.enum";

@Injectable({
  providedIn: 'root'
})
export class AmenityService {

  constructor(private http: HttpClient) { }

  getAmenities(): Observable<Amenity[]> {
    return this.http.get<Amenity[]>(`${environment.apiHost}/${ApiPaths.Amenities}`);
  }
}
