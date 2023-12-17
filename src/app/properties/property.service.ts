import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {Property} from "../shared/models/property.model";
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../env/environment";
import {ApiPaths} from "../shared/api/api-paths.enum";
import PropertiesSearchDto from "./properties-search.dto";
import PropertyAvailabilityEntry from '../shared/models/property-availability-entry.model';
import {Router, UrlSerializer} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class PropertyService {

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

  getUnapprovedProperties(searchDto?: PropertiesSearchDto): Observable<Property[]> {
    let url = `${environment.apiHost}/${ApiPaths.UnapprovedProperties}`;
    return this.http.get<Property[]>(url);
  }

  getMyProperties(hostId: any): Observable<Property[]> {
    let url = `${environment.apiHost}/${ApiPaths.Properties}/${ApiPaths.MyProperties}`;
    const params = new HttpParams().set('hostId', hostId);
    return this.http.get<Property[]>(url, { params });
  }

  approveProperty(property: Property): Observable<Property> {
    return this.http.post<Property>(`${environment.apiHost}/${ApiPaths.Properties}/${ApiPaths.ApproveProperty}/${property.id}`, {});
  }

  getProperty(id: number): Observable<Property> {
    return this.http.get<Property>(`${environment.apiHost}/${ApiPaths.Properties}/${id}`);
  }

  getImage(imageId: number, propertyId: number): Observable<Blob> {
    return this.http.get(`${environment.apiHost}/${ApiPaths.Properties}/${propertyId}/images/${imageId}`,
      {responseType: 'blob'});
  }

  getAvailability(propertyId: number): Observable<PropertyAvailabilityEntry[]> {
    return this.http.get<PropertyAvailabilityEntry[]>(`${environment.apiHost}/${ApiPaths.Properties}/${propertyId}/pricesAndAvailability`);
  }

  changeAvailability(propertyId: number, availabilityEntries: PropertyAvailabilityEntry[]): Observable<PropertyAvailabilityEntry[]> {
    return this.http.put<PropertyAvailabilityEntry[]>(`${environment.apiHost}/${ApiPaths.Properties}/${propertyId}/pricesAndAvailability`, availabilityEntries);
  }
}
