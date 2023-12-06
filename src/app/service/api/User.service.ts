import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { User } from 'src/app/models/UserModel';
import { environment } from 'src/environments/environment';
import { AuthService } from './Auth.service';
import { ConfigLocal } from 'src/app/models/Config/localState';
@Injectable({ providedIn: 'root' })
export class UserAPIService {
  headers!: {};

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) {
    const token = localStorage.getItem('token');
    if (token !== null) {
      this.headers = this.authService.getHeaders(token);
    } else {
      // Handle the case when 'configLocal' is null.
      console.error('Config data not found in local storage.');
    }
  }

  isCheckAccount(email: any): Observable<any> {
    const body = { email };
    return this.httpClient
      .post(`${environment.apiUrl}auth/isCheckAccount`, body)
      .pipe(catchError(this.handleError<any>()));
  }

  getUser(userId: any): Observable<User> {
    const body = { userId };
    return this.httpClient
      .post(`${environment.apiUrl}user/getUser`, body)
      .pipe(catchError(this.handleError<any>()));
  }

  getUserByEmail(email: any): Observable<User> {
    const body = { email };
    return this.httpClient
      .post(`${environment.apiUrl}user/getUserByEmail`, body)
      .pipe(catchError(this.handleError<any>()));
  }

  updateInfo(email: any, fullName: any): Observable<any> {
    const body = { email, fullName };
    return this.httpClient
      .put(`${environment.apiUrl}user/updateInfo`, body, {
        headers: this.headers,
      })
      .pipe(catchError(this.handleError<any>()));
  }

  /**
   * Logic code
   * @param userId
   * @returns {Observable}
   */
  getUserByUserId(_id: any): Observable<any> {
    const body = { _id };
    return this.httpClient.post(
      `${environment.apiUrl}user/getUserByUserId`,
      body
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
