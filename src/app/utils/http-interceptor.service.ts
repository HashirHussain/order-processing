import { Observable } from 'rxjs';
import { OktaAuthService } from '@okta/okta-angular';
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService {

  constructor(public auth: OktaAuthService) { }
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const accessToken = this.auth.getAccessToken();
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`,
        'Access-Control-Allow-Origin': '*'
      }
    });

    return next.handle(request).pipe(
      map(event => {
        return event;
      }),
      catchError(err => {
        if (err.status === 401) {
          console.log('err.status === 401', err.error.message);
        } else if (err.status === 451) {
          console.log('err.status === 451', err.error.message);
        } else {
          console.log('err.status', err.error.message);
        }
        console.error(err);
        return throwError(err);
      })
    );
  }
}
