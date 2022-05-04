import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class MiddlewareInterceptor implements HttpInterceptor {


  private prefix: string = "Bearer ";

  constructor(public authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    request = request.clone(Object.assign({
      url: environment.url + request.url,
      setHeaders: {
        'Content-Type': 'application/json'
      }
    }, this.setAutorization()));
    return next.handle(request);
  }

  setAutorization() {
    let token = this.authService.getToken()
    if(this.authService.isAuthenticated()) {
      return { setHeaders: { Authorization: this.prefix + token } }
    } else {
      return null
    }
  }


}
