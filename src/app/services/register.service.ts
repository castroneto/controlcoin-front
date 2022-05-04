import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterInterface, TokenInterface, User } from '../interfaces/user';
import { firstValueFrom } from 'rxjs/internal/firstValueFrom';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(public http: HttpClient) { }


  public register(user: RegisterInterface) : Promise<TokenInterface> { 
    return firstValueFrom(this.http.post<TokenInterface>('/signup', user));
  }

}
