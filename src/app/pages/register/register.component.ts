import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormArray } from '@angular/forms';
import { formDirectiveProvider } from '@angular/forms/src/directives/ng_form';

@Component({
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  emailFilled: boolean = false;
  usernameFilled: boolean = false;
  passwordFilled: boolean = false;

  emailValid: boolean = false;
  usernameValid: boolean = false;
  passwordValid: boolean = false;

  registerFormData: {
    username: string;
    password: string;
    email: string;
  } = {
    username: '',
    password: '',
    email: ''
  };

  constructor(private router: Router, private auth: AuthService) {}

  ngOnInit() {}

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

  emailFilledOut() {
    this.emailFilled = this.registerFormData.email ? true : false;
    this.emailValid = this.emailFilled
      ? //email is at least 5 characters[a-z0-9]+
        this.registerFormData.email.length > 4
        ? //email is alphanumeric
          this.registerFormData.email.match(/[^a-z0-9.@]+/gi)
          ? false
          : //email fits the [char]+@[char]+.[char]+ pattern
            this.registerFormData.email.match(/[a-z0-9]+@[a-z0-9]+\.[a-z0-9]+/gi)
            ? true
            : false
        : false
      : false;
  }

  usernameFilledOut() {
    this.usernameFilled = this.registerFormData.username ? true : false;
  }

  passwordFilledOut() {
    this.passwordFilled = this.registerFormData.password ? true : false;
  }
}
