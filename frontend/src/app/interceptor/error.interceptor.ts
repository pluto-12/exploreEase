import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from "rxjs/operators";
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      tap((event) => {
        if (event instanceof HttpResponse) {
          console.log('Response Interceptor:', event);
        }
      }),
      catchError((error: any) => {
        console.error('Error Interceptor:', error);
        alert('Something Went Wrong..')
        // this.router.navigateByUrl('')
        // if(error instanceof HttpErrorResponse && (error.status == 400) || (error.status == 500)) {
        //   alert('Something Went Wrong..')
        //   this.router.navigateByUrl('')
        // }
        return throwError(() =>  error)
      })
    )
  }
}
