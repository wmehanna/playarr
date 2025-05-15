import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoadingService } from './loading.service';

@Injectable({
    providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {
    constructor(
        private snackBar: MatSnackBar,
        private loading: LoadingService
    ) {}

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        this.loading.show();
        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => {
                const msg =
                    error.error?.error || error.message || 'Unexpected error';
                this.snackBar.open(msg, 'Close', { duration: 5000 });
                return throwError(error);
            }),
            finalize(() => this.loading.hide())
        );
    }
}
