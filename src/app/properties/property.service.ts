import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {Property} from "../shared/models/property.model";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../env/environment";
import {ApiPaths} from "../shared/api/api-paths.enum";
import PropertiesSearchDto from "./properties-search.dto";
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

    console.log(url);
    return this.http.get<Property[]>(url);
  }

  getProperty(id: number): Observable<Property> {
    return this.http.get<Property>(`${environment.apiHost}/${ApiPaths.Properties}/${id}`);
  }

  getImage(imageId: number, propertyId: number): Observable<Blob> {
    return this.http.get(`${environment.apiHost}/${ApiPaths.Properties}/${propertyId}/images/${imageId}`,
      {responseType: 'blob'});
  }
}
