import { DatePipe } from '@angular/common';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

type GenericObject = Record<string, unknown>;
function isNotEmpty(val: GenericObject | {} | null): val is GenericObject {
  return val != null && Object.keys(val).length > 0;
}

export class RequestDateInterceptor implements HttpInterceptor {
  private datePipe: DatePipe = new DatePipe('en-US');

  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const body = req.body;

    if (typeof body === 'object' && isNotEmpty(body)) {
      this.convert(body);
    }

    return next.handle(req);
  }

  toISOStringWithoutTimezone(date: Date) {
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }

  convert(body: GenericObject){
    if (body === null || body === undefined) {
      return;
    }
    if (typeof body !== 'object'){
      return;
    }
    console.log("Intercepted Request", body);
    for (const key of Object.keys(body)) {
      const value = body[key];
      if (value instanceof Date) {
        body[key] = this.toISOStringWithoutTimezone(value);
      } else if (typeof value === 'object' && isNotEmpty(value)) {
        this.convert(value);
      }
    }
  }
}
