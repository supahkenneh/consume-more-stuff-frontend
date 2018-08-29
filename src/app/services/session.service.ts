import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  user: {
    username: string;
    user_id: number;
    email: string;
  } = {
    username: '',
    user_id: -1,
    email: ''
  };

  private _isLoggedInSubject = new BehaviorSubject<boolean>(false);

  constructor() {
    let userString = window.localStorage.getItem('user');
    try {
      if (userString) {
        this.user = JSON.parse(userString);
      } else {
        this._isLoggedInSubject.next(!!userString);
      }
    } catch (err) {
      console.log('Could not parse user');
    }
  }

  getSession() {
    console.log('get',this.user)
    return this.user;
  }
  //create a logged in session for the user
  setSession(data) {
    console.log('setsess', data);
    this.user.username = data.username;
    this.user.user_id = data.id;
    this.user.email = data.email;

    let userString = JSON.stringify(this.user);
    window.localStorage.setItem('user', userString);

    this._isLoggedInSubject.next(true);
  }

  clearSession() {
    this.user.username = '';
    window.localStorage.removeItem('user');

    this._isLoggedInSubject.next(false);
  }

  isLoggedInAsAnObservable() {
    return this._isLoggedInSubject.asObservable();
  }
}
