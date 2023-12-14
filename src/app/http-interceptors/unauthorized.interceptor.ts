import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse
} from '@angular/common/http';

import {catchError, Observable, tap, throwError} from 'rxjs';
import {Router} from "@angular/router";

/** Redirect to home if not authorized */
@Injectable()
export class UnauthorizedInterceptor implements HttpInterceptor {
  constructor(private router: Router) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 && !req.headers.has('skip')) {
          this.router.navigate(['/home']);
        }
        return throwError(() => error)
      })
    );
  }
}
