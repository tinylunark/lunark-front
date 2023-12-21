import { DatePipe } from '@angular/common';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

type GenericObject = Record<string, unknown>;
function isNotEmpty(val: GenericObject | {} | null): val is GenericObject {
  return val != null && Object.keys(val).length > 0;
}

// Response conversion based on: https://dev.to/imben1109/date-handling-in-angular-application-part-2-angular-http-client-and-ngx-datepicker-3fna
export class DateInterceptor implements HttpInterceptor {

  private _isoDateFormat = /^\d{4}-\d{2}-\d{2}$/;
  private timeZoneOffset = (new Date()).getTimezoneOffset();
  private datePipe: DatePipe = new DatePipe('en-US');

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (req.body === null || req.body === undefined) {
      req = req.clone({
        body: structuredClone(req.body),
      });
    } 

    if (typeof req.body === 'object' && isNotEmpty(req.body)) {
      this.convertRequest(req.body);
    }

    return next.handle(req).pipe(map( (val: HttpEvent<unknown>) => {
      if (val instanceof HttpResponse){
        const body = val.body;
        if (typeof body === 'object' && isNotEmpty(body)) {
          this.convertResponse(body);
        }
      }
      return val;
    }));
  }

  isIsoDateString(value: string): boolean {
    if (value === null || value === undefined) {
      return false;
    }
    return this._isoDateFormat.test(value);
  }

  toMidinghtInCurrentTimeZone(date: Date) {
    return new Date(date.getTime() + this.timeZoneOffset * 60000);
  }

  toISOStringWithoutTimezone(date: Date) {
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }

  convertRequest(body: GenericObject){
    if (body === null || body === undefined) {
      return;
    }
    for (const key of Object.keys(body)) {
      const value = body[key];
      if (value instanceof Date) {
        body[key] = this.toISOStringWithoutTimezone(value);
      } else if (typeof value === 'object' && isNotEmpty(value)) {
        this.convertRequest(value);
      }
    }
  }

  convertResponse(body: GenericObject){
    if (body === null || body === undefined) {
      return;
    }
    for (const key of Object.keys(body)) {
      const value = body[key];
      if (typeof value === 'string' && this.isIsoDateString(value)) {
        body[key] = this.toMidinghtInCurrentTimeZone(new Date(value));
      } else if (typeof value === 'object' && isNotEmpty(value)) {
        this.convertResponse(value);
      }
    }
  }
}