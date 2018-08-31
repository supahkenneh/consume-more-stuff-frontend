import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerFormData: {
    username: string;
    password: string;
    email: string;
  } = {
      username: '',
      password: '',
      email: ''
    };

  constructor(private router: Router, private auth: AuthService) { }

  register() {
    console.log(this.registerFormData);
    this.registerFormData.username = this.registerFormData.username.toLowerCase();
    this.registerFormData.email = this.registerFormData.email.toLocaleLowerCase();
    console.log(this.registerFormData);
    return this.auth
      .register(this.registerFormData)
      .then(() => {
        return this.router.navigate(['/login']);
      })
      .catch(err => {
        console.log('error: ', err);
      });
  }
}
