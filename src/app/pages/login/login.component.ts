import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  usernameFilled: boolean = false;
  passwordFilled: boolean = false;

  usernameValid: boolean = false;
  passwordValid: boolean = false;

  usernameError: string;
  passwordError: string;
  loginError: boolean = false;

  loginFormData: {
    username: string;
    password: string;
  } = {
    username: '',
    password: ''
  };

  constructor(private router: Router, private auth: AuthService) {}

  login() {
    this.loginFormData.username = this.loginFormData.username.toLowerCase();
    return this.auth
      .login(this.loginFormData)
      .then(() => {
        this.router.navigate(['user/items']);
      })
      .catch(err => {
        this.loginError = true;
        console.log('error: ', err);
      });
  }

  usernameFilledOut() {
    //Initialize the error messages
    if (this.usernameError) {
      this.usernameError = '';
    }

    //check to see the input is not empty
    if ((this.usernameFilled = this.loginFormData.username ? true : false)) {
      this.usernameValid = this.lengthCheck(
        this.loginFormData.username,
        4,
        'Username',
        this.setUsernameError.bind(this)
      )
        ? true
        : false;
    } else {
      document.getElementById('username-span').attributes[2].value =
        'Username is required';
      document.getElementById('username-span').className = 'focus-input100-error';
    }
  }

  passwordFilledOut() {
    //Initialize the error messages
    if (this.passwordError) {
      this.passwordError = '';
    }

    if ((this.passwordFilled = this.loginFormData.password ? true : false)) {
      this.passwordValid = this.lengthCheck(
        this.loginFormData.password,
        4,
        'Password',
        this.setPasswordError.bind(this)
      )
        ? true
        : false;
    } else {
      document.getElementById('password-span').attributes[2].value =
        'Password is required';
      document.getElementById('password-span').className = 'focus-input100-error';
    }
  }

  loginInError() {}

  setUsernameError(error) {
    this.usernameError = error;
  }

  setPasswordError(error) {
    this.passwordError = error;
  }

  lengthCheck(str, lengthSize, field, errorFun) {
    let temp = str.length > lengthSize ? true : false;
    if (!temp) {
      errorFun(`${field} requires a minimum of ${lengthSize + 1} characters`);
    }

    return temp;
  }

  disabledReasons() {
    this.usernameFilledOut();
    this.passwordFilledOut();
  }
}
