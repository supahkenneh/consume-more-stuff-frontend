import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from '../../services/session.service';
import { BackendService } from '../../services/backend.service';

@Component({
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})

export class SettingsComponent implements OnInit {
  user: object;
  showPasswordForm: boolean = false;
  private _isLoggedInAsObservable;
  private _isLoggedIn: boolean;
  passwordFormData: {
    oldPass: string;
    newPass: string;
    verifyPass: string;
  } = {
      oldPass: '',
      newPass: '',
      verifyPass: ''
    }

  passwordErrors: string[] = [];

  messages: string[] = [];

  constructor(
    private router: Router,
    private backend: BackendService,
    private session: SessionService
  ) {
    this.user = this.session.getSession();
    this.passwordErrors.length = 0;
  }

  ngOnInit() {
    this._isLoggedInAsObservable = this.session.isLoggedInAsAnObservable();

    this._isLoggedInAsObservable.subscribe(
      (loggedIn: boolean) => {
        this._isLoggedIn = loggedIn;
      },
      err => {
        console.log(err);
      }
    );
  }

  isLoggedIn() {
    return this._isLoggedIn;
  }

  getErrors() {
    return this.passwordErrors.join(', ')
  }

  submitPasswordChange() {
    if (this.passwordFormData.newPass !== this.passwordFormData.verifyPass) {
      return this.passwordErrors.push(`New password doesn't match`)
    }
    return this.backend.changePassword(this.passwordFormData)
      .then(result => {
        if (result['message'] === 'Wrong existing password') {
          return this.passwordErrors.push(result['message'])
        }
      })
      .then(() => {
        this.messages.push('Password change successful!')
        this.showPassForm();
      })
  }

  showPassForm() {
    if (this.showPasswordForm) {
      return this.showPasswordForm = false;
    } else {
      this.passwordFormData = {
        oldPass: '',
        newPass: '',
        verifyPass: ''
      };
      this.messages.length = 0;
      return this.showPasswordForm = true;
    }
  }

  getMessages() {
    return this.messages.join(', ');
  }
}