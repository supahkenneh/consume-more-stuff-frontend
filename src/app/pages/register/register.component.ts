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

  emailError: any;
  usernameError: object;
  passwordError: any;

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
    //Initialize the error messages
    if (this.emailError) {
      this.emailError = '';
    }

    //Check to see that the input is not empty
    if ((this.emailFilled = this.registerFormData.email ? true : false)) {
      //email is at least 5 characters[a-z0-9]+
      this.emailValid = this.lengthCheck(this.registerFormData.email, 4, 'Email')
        ? //email is alphanumeric
          this.alphanumeric(this.registerFormData.email, /[^a-z0-9.@]+/gi)
          ? //email fits the [char]+@[char]+.[char]+ pattern
            this.emailPattern(
              this.registerFormData.email,
              /[a-z0-9]+@[a-z0-9]+\.[a-z0-9]+/gi
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

  lengthCheck(str, lengthSize, field) {
    let temp = str.length > lengthSize ? true : false;
    if (!temp) {
      this.emailError = `${field} requires a minimum of ${lengthSize + 1} characters`;
    }
    return temp;
  }

  alphanumeric(str, regex) {
    let temp = str.match(regex);
    if (temp) {
      this.emailError = `${temp.join(', ')} are invalid characters.`;
    }
    return !temp;
  }

  emailPattern(str, regex) {
    let temp = str.match(regex);
    if (!temp) {
      this.emailError = 'This is not a valid format for email.';
    }
    return !!temp;
  }

  usernameFilledOut() {
    this.usernameFilled = this.registerFormData.username ? true : false;
    if (this.usernameFilled) {
      //username is at least 5 characters[a-z0-9]+
      this.usernameValid =
        this.registerFormData.username.length > 4
          ? //username is alphanumeric
            this.registerFormData.username.match(/[^a-z0-9]+/gi)
            ? false
            : true
          : false;
    } else {
      document.getElementById('username-span').attributes[2].value =
        'Username is required';
      document.getElementById('username-span').className = 'focus-input100-error';
    }
  }

  emailUsed() {
    return this.backend
      .checkEmail(this.registerFormData.email)
      .then(response => {
        console.log(response);
        return response['emailTaken'];
      })
      .catch(err => {
        console.log('Error: ', err);
      });
  }

  usernameUsed() {
    return this.backend
      .checkEmail(this.registerFormData.email)
      .then(response => {
        console.log(response);
        return response['emailTaken'];
      })
      .catch(err => {
        console.log('Error: ', err);
      });
  }

  passwordFilledOut() {
    this.passwordFilled = this.registerFormData.password ? true : false;
    if (this.passwordFilled) {
    } else {
      document.getElementById('password-span').attributes[2].value =
        'Password is required';
      document.getElementById('password-span').className = 'focus-input100-error';
    }
  }

  disabledReasons() {
    this.usernameFilledOut();
    this.emailFilledOut();
    this.passwordFilledOut();
  }
}
