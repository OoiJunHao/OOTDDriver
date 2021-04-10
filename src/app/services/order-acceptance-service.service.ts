import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SaleTransaction } from '../models/sale-transaction';
import { SessionService } from './session.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class OrderAcceptanceServiceService {
  baseUrl: string = "/api/saleTransactionManagement";
  
  constructor(private httpClient: HttpClient,
    private sessionService: SessionService) { }

  retrieveOrder() : Observable<SaleTransaction> {
    return this.httpClient.get<SaleTransaction>(this.baseUrl + "/retrieveOneSaleTransaction").pipe(
      catchError(this.handleError)
    );
  }

  /*retrieveOrder() : Observable<SaleTransaction> {
    return this.httpClient.get<SaleTransaction>(this.baseUrl + "/retrieveOneSaleTransaction?" + "username=" + this.sessionService.getUsername() + "password=" + this.sessionService.getPassword()).pipe(
      catchError(this.handleError)
    )
  }*/
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

