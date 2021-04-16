import { Injectable } from '@angular/core';
import { SessionService } from './session.service';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ImagePickerService {
  baseUrl: string = "/api/Driver";

  constructor(private httpClient: HttpClient, private sessionService: SessionService) { }

  uploadImage(driverId: string, base64Image: string): Observable<any> {
    return this.httpClient.post<any>(this.baseUrl + "/uploadProfilePicture?driverId=" + driverId, base64Image, httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  
  retrieveProfilePicture(driverId: string): Observable<any> {
    return this.httpClient.get<any>(this.baseUrl + "/retrieveProfilePicture?driverId=" + driverId).pipe(
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
