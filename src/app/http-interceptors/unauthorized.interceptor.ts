import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse
} from '@angular/common/http';

import {catchError, Observable, throwError} from 'rxjs';
import {Router} from "@angular/router";

/** Redirect to session expired screen if not authorized */
@Injectable()
export class UnauthorizedInterceptor implements HttpInterceptor {
  constructor(private router: Router) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 && !req.headers.has('skip')) {
          localStorage.removeItem('lunark-user');
          this.router.navigate(['/session-expired']);
        }
        return throwError(() => error)
      })
    );
  }
}
