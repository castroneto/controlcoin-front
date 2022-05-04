import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from 'src/app/services/register.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  public registerForm = new FormGroup({
    email: new FormControl(),
    password: new FormControl(),
    username: new FormControl(),
  });

  constructor(public registerService: RegisterService, private authService: AuthService, public route: Router) { }

  ngOnInit(): void {
  }

  async onSubmit(): Promise<void> {
    if(this.registerForm.valid) {
      try {
        var response = await this.registerService.register(this.registerForm.value)
        this.authService.storeToken(response);
        this.route.navigate(['/dashboard'])
      } catch(error) {
        console.log(error)
      }
    }
  } 


}
