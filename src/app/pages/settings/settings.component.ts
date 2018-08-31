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

  constructor(
    private router: Router,
    private backend: BackendService,
    private session: SessionService
  ) {
    this.user = this.session.getSession();
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

  submitPasswordChange() {
    return this.backend.changePassword(this.passwordFormData)
  }

}