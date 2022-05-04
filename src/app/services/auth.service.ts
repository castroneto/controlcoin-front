import { Injectable } from '@angular/core';
import { LoginInterface, TokenInterface, User } from '../interfaces/user';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs' ; 

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public http: HttpClient) { }



  public getToken() {
    return localStorage.getItem('token');
  }

    // ...
    public isAuthenticated(): boolean {
      const token = localStorage.getItem('token');
      // Check whether the token is expired and return
      // true or false
      //return !this.token.isTokenExpired(token)
      return !!token
    }
  

  login(credentials: LoginInterface) : Promise<TokenInterface> {
    return firstValueFrom(this.http.post<TokenInterface>('/login', credentials))
  }


  storeToken(data: TokenInterface) {
    localStorage.setItem('token', data.token);
    localStorage.setItem('expirationTime', String(data.expirationTime));
  }


  logout() {
    localStorage.clear()
  }

}
