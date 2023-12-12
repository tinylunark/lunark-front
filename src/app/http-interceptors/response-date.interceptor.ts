import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

type GenericObject = Record<string, unknown>;
function isNotEmpty(val: GenericObject | {} | null): val is GenericObject {
  return val != null && Object.keys(val).length > 0;
}

// Based on: https://dev.to/imben1109/date-handling-in-angular-application-part-2-angular-http-client-and-ngx-datepicker-3fna
export class ResponseDateInterceptor implements HttpInterceptor {

  private _isoDateFormat = /^\d{4}-\d{2}-\d{2}$/;

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(req).pipe(map( (val: HttpEvent<unknown>) => {
      if (val instanceof HttpResponse){
        const body = val.body;
        if (typeof body === 'object' && isNotEmpty(body)) {
          this.convert(body);
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

  convert(body: GenericObject){
    if (body === null || body === undefined) {
      return;
    }
    if (typeof body !== 'object'){
      return;
    }
    console.log("Intercepted", body);
    for (const key of Object.keys(body)) {
      const value = body[key];
      if (typeof value === 'string' && this.isIsoDateString(value)) {
        body[key] = new Date(value);
      } else if (typeof value === 'object' && isNotEmpty(value)) {
        this.convert(value);
      }
    }
  }
}