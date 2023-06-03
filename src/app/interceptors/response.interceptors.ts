import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { retry, map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ResponseInterceptors implements HttpInterceptor {
  constructor() {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      //to make 3 more try to call API
      retry(3),

      //if no error is there then return res
      // map((res:any) => {
      //   if (res instanceof HttpResponse) {
      //     return res;
      //   }
      //   return null;
      // }),

      //if error it there in after calling API
      catchError((error: HttpErrorResponse) => {
        let errMsg = '';
        //Client Error
        if (error.error instanceof ErrorEvent) {
          errMsg = `Error : ${error.message}`;
        } else {
          //Server Side Error
          errMsg = `Error Code : ${error.status} Message : ${error.message}`;
        }
        return throwError(errMsg);
      })
    );
  }
}
