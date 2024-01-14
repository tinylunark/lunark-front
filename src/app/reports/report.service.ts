import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../env/environment";
import {ApiPaths} from "../shared/api/api-paths.enum";
import GeneralReport from "./general-report.model";
import PropertyReport from "./property-report.model";

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(
    private http: HttpClient
  ) {
  }

  getGeneralReport(start: Date, end: Date) {
    const startString = start.toISOString().slice(0, 10);
    const endString = end.toISOString().slice(0, 10);

    return this.http.get<GeneralReport>(`${environment.apiHost}/${ApiPaths.Reports}/general`, {
      params: {
        'start': startString,
        'end': endString
      }
    });
  }

  getPropertyReport(propertyId: number, year: number) {
    return this.http.get<PropertyReport>(`${environment.apiHost}/${ApiPaths.Reports}/property`, {
      params: {
        propertyId,
        year
      }
    })
  }
}
