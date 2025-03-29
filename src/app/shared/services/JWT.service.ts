import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class JWTService {
  constructor() { }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    const token = localStorage.getItem('token');
    return token;
  }


  getExpiryTime() {
    const token = this.getToken();
    return token ? jwtDecode(token).exp : null;
  }

}

