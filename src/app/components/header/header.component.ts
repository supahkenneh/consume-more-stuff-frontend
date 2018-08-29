import { Component, OnInit, OnDestroy } from '@angular/core';
import { SessionService } from '../../services/session.service';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  user: object;
  private _isLoggedInAsObservable;
  private _isLoggedIn: boolean;
  constructor(
    private session: SessionService,
    private auth: AuthService
  ) {
    this.user = session.getSession();
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

  logout() {
    this._isLoggedInAsObservable = this.session.isLoggedInAsAnObservable();

    return this.auth.logout().catch(err => {
      console.log('error: ', err);
    });
  }

  ngOnDestroy() {
    this._isLoggedInAsObservable.unsubscribe();
  }
}
