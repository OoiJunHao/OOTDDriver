import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SessionService } from './session.service';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Driver } from '../models/driver';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class DriverService {
  baseUrl: string = "/api/Driver";

  constructor(private httpClient: HttpClient,
    private sessionService: SessionService) { }

  driverLogin(username: string | undefined, password: string | undefined): Observable<Driver> {
    return this.httpClient.get<Driver>(this.baseUrl + "/driverLogin?username=" + username + "&password=" + password).pipe(
      catchError(this.handleError)
    );
  }

  createNewDriver(newDriver: Driver): Observable<any> {
    let createNewDriverReq = {
      "newDriver": newDriver,
    };
    return this.httpClient.put<any>(this.baseUrl, createNewDriverReq, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  updateDriver(toUpdateDriver: Driver): Observable<any> {
    console.log(toUpdateDriver);
    let updateDriverReqIonic = {
      'toUpdateDriver': toUpdateDriver
    }
    return this.httpClient.post<any>(this.baseUrl, updateDriverReqIonic, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage: string = "";

    if (error.error instanceof ErrorEvent) {
      errorMessage = "An unknown error has occurred: " + error.error;
    }
    else {
      errorMessage = "A HTTP error has occurred: " + `HTTP ${error.status}: ${error.error}`;
    }

    console.error(errorMessage);

    return throwError(errorMessage);
  }
}
