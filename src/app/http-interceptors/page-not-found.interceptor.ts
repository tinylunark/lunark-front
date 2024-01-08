import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';

import {Observable} from 'rxjs';
import {Router} from "@angular/router";

/** Redirect to page not found if no resource */
@Injectable()
export class PageNotFoundInterceptor implements HttpInterceptor {
  constructor(private router: Router) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      // Disabled for now, causing some issues...
      // catchError((error: HttpErrorResponse) => {
        // if (error.status === 404) {
        //   this.router.navigate(['/404']);
        // }
        // return throwError(() => error)
      // })
    );
  }
}
