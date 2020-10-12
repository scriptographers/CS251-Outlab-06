import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
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
        catchError(this.handleError<Data>())
      );
  }

  sendData(data: Data): Observable<Data> {
    return this.http.post<Data>(this.post_url, data, this.httpOptions)
      .pipe(
        // tap(_ => console.log('posted data')),
        catchError(this.handleError<Data>())
      )
  }

  private handleError<T>(result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.log(error); // log to console instead
      alert('Submission unsuccessful, try again.')

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
