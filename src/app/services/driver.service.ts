import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SessionService } from './session.service';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Driver } from '../models/driver';
import { SaleTransaction } from '../models/sale-transaction';

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

  retrieveDriverTransactions(driverId: string): Observable<SaleTransaction[]> {
    return this.httpClient.get<SaleTransaction[]>(this.baseUrl + "/getDriverTransactionDeliveries?driverId=" + driverId).pipe(
          catchError(this.handleError)
    );
  }

  addOrderToDriver(driverId : Number, customerId : Number, saleTransactionId : Number) : Observable<any> {
    return this.httpClient.get<any>(this.baseUrl + "/setSaleToDriver/" + driverId + "/" + customerId + "/" + saleTransactionId).pipe(
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

  retrieveCurrentDeliveryTransaction(driverId: Number): Observable<SaleTransaction> {
    return this.httpClient.get<SaleTransaction>(this.baseUrl + "/getCurrentDelivery/" + driverId).pipe(
      catchError(this.handleError)
    );
  }

  completeDelivery(driverId: Number, saleTransactionId: Number): Observable<any> {
    return this.httpClient.get<any>(this.baseUrl + "/completeDelivery/" + driverId + "/" + saleTransactionId).pipe(
      catchError(this.handleError)
   );
  }

  cashOutEarnings(driverId: Number): Observable<Driver> {
    return this.httpClient.post<any>(this.baseUrl + "/cashOutEarnings/?driverId=" + driverId, httpOptions).pipe(
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
