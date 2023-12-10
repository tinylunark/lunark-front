import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";
import Property from "../shared/models/property.model";
import Location from "../shared/models/location.model";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../env/environment";
import {ApiPaths} from "../shared/api/api-paths.enum";

@Injectable({
  providedIn: 'root'
})
export class PropertyService {

  constructor(private http: HttpClient) { }

  getProperties(): Observable<Property[]> {
    return this.http.get<Property[]>(`${environment.apiHost}/${ApiPaths.Properties}`);
  }

  getProperty(id: number): Observable<Property> {
    return this.http.get<Property>(`${environment.apiHost}/${ApiPaths.Properties}/${id}`);
  }

  getImage(imageId: number, propertyId: number): Observable<Blob> {
    return this.http.get(`${environment.apiHost}/${ApiPaths.Properties}/${propertyId}/images/${imageId}`,
      {responseType: 'blob'});
  }
}
