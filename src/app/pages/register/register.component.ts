import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { BackendService } from '../../services/backend.service';
import { FormArray } from '@angular/forms';
import { formDirectiveProvider } from '@angular/forms/src/directives/ng_form';

@Component({
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  emailFilled: boolean = false;
  usernameFilled: boolean = false;
  passwordFilled: boolean = false;

  emailTaken: boolean = false;
  usernameTaken: boolean = false;

  emailValid: boolean = false;
  usernameValid: boolean = false;
  passwordValid: boolean = false;

  emailError: string;
  usernameError: string;
  passwordError: string;

  registerFormData: {
    username: string;
    password: string;
    email: string;
  } = {
    username: '',
    password: '',
    email: ''
  };

  constructor(
    private router: Router,
    private auth: AuthService,
    private backend: BackendService
  ) {}

  register() {
    this.registerFormData.username = this.registerFormData.username.toLowerCase();
    this.registerFormData.email = this.registerFormData.email.toLocaleLowerCase();
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
    //Initialize the error messages
    if (this.emailError) {
      this.emailError = '';
    }

    //Check to see that the input is not empty
    if ((this.emailFilled = this.registerFormData.email ? true : false)) {
      //email is at least 5 characters
      this.emailValid = this.lengthCheck(
        this.registerFormData.email,
        4,
        'Email',
        this.setEmailError.bind(this)
      )
        ? //email is alphanumeric
          this.alphanumeric(
            this.registerFormData.email,
            /[^a-z0-9.@]+/gi,
            this.setEmailError.bind(this)
          )
          ? //email fits the [char]+@[char]+.[char]+ pattern
            this.emailPattern(
              this.registerFormData.email,
              /[a-z0-9]+@[a-z0-9]+\.[a-z0-9]+/gi,
              this.setEmailError.bind(this)
            )
            ? true
            : false
          : false
        : false;
    } else {
      //creates an error messsage about empty fields
      document.getElementById('email-span').attributes[2].value = 'Email is required';
      document.getElementById('email-span').className = 'focus-input100-error';
    }

    //if email is valid, check to see it is not already taken
    if (this.emailValid) {
      this.emailUsed().then(response => {
        this.emailValid = !response;
        if (!this.emailValid) {
          this.emailError = 'This email has already been registered.';
        }
      });
    }
  }

  usernameFilledOut() {
    //Initialize the error messages
    if (this.usernameError) {
      this.usernameError = '';
    }

    //Check to see that the input is not empty
    if ((this.usernameFilled = this.registerFormData.username ? true : false)) {
      //username is at least 5 characters
      this.usernameValid = this.lengthCheck(
        this.registerFormData.username,
        4,
        'Username',
        this.setUsernameError.bind(this)
      )
        ? //username is alphanumeric
          this.alphanumeric(
            this.registerFormData.username,
            /[^a-z0-9]+/gi,
            this.setUsernameError.bind(this)
          )
          ? true
          : false
        : false;
    } else {
      document.getElementById('username-span').attributes[2].value =
        'Username is required';
      document.getElementById('username-span').className = 'focus-input100-error';
    }

    //if username is valid, check to see it is not already taken
    if (this.usernameValid) {
      this.usernameUsed().then(response => {
        this.usernameValid = !response;
        if (!this.usernameValid) {
          this.usernameError = 'This email has already been registered.';
        }
      });
    }
  }

  passwordFilledOut() {
    //Initialize the error messages
    if (this.passwordError) {
      this.passwordError = '';
    }

    //Check to see that the input is not empty
    if ((this.passwordFilled = this.registerFormData.password ? true : false)) {
      this.passwordValid = this.lengthCheck(
        this.registerFormData.password,
        4,
        'Password',
        this.setPasswordError.bind(this)
      )
        ? this.alphanumeric(
            this.registerFormData.password,
            /[[\]{}()/\\|]+/g,
            this.setPasswordError.bind(this)
          )
          ? true
          : false
        : false;
    } else {
      document.getElementById('password-span').attributes[2].value =
        'Password is required';
      document.getElementById('password-span').className = 'focus-input100-error';
    }
  }

  emailUsed() {
    return this.backend
      .checkEmail(this.registerFormData.email)
      .then(response => {
        return response['emailTaken'];
      })
      .catch(err => {
        console.log('Error: ', err);
      });
  }

  usernameUsed() {
    return this.backend
      .checkUsername(this.registerFormData.username)
      .then(response => {
        return response['usernameTaken'];
      })
      .catch(err => {
        console.log('Error: ', err);
      });
  }

  setUsernameError(error) {
    this.usernameError = error;
  }

  setEmailError(error) {
    this.emailError = error;
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

  alphanumeric(str, regex, errorFun) {
    let temp = str.match(regex);
    if (temp) {
      errorFun(`${temp.join(', ')} are invalid characters.`);
    }
    return !temp;
  }

  emailPattern(str, regex, errorFun) {
    let temp = str.match(regex);
    if (!temp) {
      errorFun('This is not a valid format for email.');
    }
    return !!temp;
  }

  disabledReasons() {
    this.usernameFilledOut();
    this.emailFilledOut();
    this.passwordFilledOut();
  }
}
