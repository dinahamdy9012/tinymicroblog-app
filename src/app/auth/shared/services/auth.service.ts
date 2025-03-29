import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = environment.authApiUrl; // Replace with your backend

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/login`, { username, password }).pipe(
      map((response: any) => {
        localStorage.setItem('token', response.data.accessToken);
        localStorage.setItem('loginResponse', JSON.stringify(response.data));
      })
    );
  }
}
