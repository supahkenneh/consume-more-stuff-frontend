import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormDataValidation } from '../../services/formDataValidation.service';

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

  constructor(
    private router: Router,
    private auth: AuthService,
    private valid: FormDataValidation
  ) {}

  ngOnInit(){
    this.valid.loginUserFieldInit(this.loginFormData)
  }
  
  login() {
    this.loginFormData.username = this.loginFormData.username.toLowerCase();
    return this.auth
      .login(this.loginFormData)
      .then(() => {
        this.router.navigate(['user/items']);
      })
      .catch(err => {
        console.log('error: ', err);
      });
  }
}
