import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormDataValidation } from '../../services/formDataValidation.service';
import { FormArray } from '@angular/forms';
import { formDirectiveProvider } from '@angular/forms/src/directives/ng_form';

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

  constructor(
    private router: Router,
    private auth: AuthService,
    private valid: FormDataValidation 
  ) {
  }

  ngOnInit() {
    this.valid.userFieldInit(this.registerFormData);
  }

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
