import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Data } from './form-data';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  get_url = 'https://cs251-outlab-6.herokuapp.com/initial_values/';
  post_url = 'https://cs251-outlab-6.herokuapp.com/add_new_feedback/';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getInit(): Observable<Data> {
    return this.http.get<Data>(this.get_url)
      .pipe(
        // tap(_ => console.log('fetched data')),
        catchError(this.handleError)
      );
  }

  sendData(data: Data): Observable<Data> {
    return this.http.post<Data>(this.post_url, data, this.httpOptions)
      .pipe(
        // tap(_ => console.log('posted data')),
        catchError(this.handleError)
      )
  }

  // return the errors, if any, Reference: https://scotch.io/bar-talk/error-handling-with-angular-6-tips-and-best-practices192
  private handleError(error: any) {
    let errorMessage = "";
    if (error.error instanceof ErrorEvent)
      errorMessage = `Message: ${error.error.message}`;
    else
      errorMessage = `Error Code: ${error.status} \| Message: ${error.message}`;
    return throwError(errorMessage);
  }
}
