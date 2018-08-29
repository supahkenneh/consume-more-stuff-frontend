import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginFormData: {
    username: string;
    password: string;
  } = {
    username: '',
    password: ''
  };

  constructor(private router: Router, private auth: AuthService) {}

  login() {
    return this.auth
      .login(this.loginFormData)
      .then(() => {
        this.router.navigate(['/user/items']);
      })
      .catch(err => {
        console.log('error: ', err);
      });
  }
}
