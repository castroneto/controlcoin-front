import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl(),
    password: new FormControl(),
  });

  constructor(private authService: AuthService, public route: Router) { }

  ngOnInit(): void {
  }

  async onSubmit(): Promise<void> {
    if(this.loginForm.valid) {
      try {
        var response = await this.authService.login(this.loginForm.value);
        this.authService.storeToken(response);
        this.route.navigate(['/dashboard'])
      } catch(error) {
        console.log(error)
      }
    }
  } 

}
