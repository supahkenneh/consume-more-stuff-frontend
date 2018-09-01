import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormDataValidation {
  private _userFilledOut: boolean = false;
  private _requiredItemObservable: Observable<boolean>;
  private _requiredNewUserObservable: Observable<boolean>;
  private _requiredLogInUserObservable: Observable<boolean>;
  private _itemReqKeys: Array<string> = [
    'description',
    'condition_id',
    'category_id',
    'status_id'
  ];
  private _newUserReqKeys: Array<string> = ['username', 'email', 'password'];
  private _loginUserReqKeys: Array<string> = ['username', 'password'];
  require: object;
  data: object;
  constructor() {}

  newUserFieldInit(data) {
    this._requiredNewUserObservable = new Observable(observer => {
      this._newUserReqKeys.every(key => data[key])
        ? observer.next(true)
        : observer.next(false);
    });
  }

  loginUserFieldInit(data) {
    this._requiredLogInUserObservable = new Observable(observer => {
      this._loginUserReqKeys.every(key => data[key])
        ? observer.next(true)
        : observer.next(false);
    });
  }

  itemFieldInit(data) {
    this._requiredItemObservable = new Observable(observer => {
      this._itemReqKeys.every(key => data[key])
        ? observer.next(true)
        : observer.next(false);
    });
  }

  newUserValidation() {
    this._requiredNewUserObservable.subscribe((formComplete: boolean) => {
      console.log(formComplete);
      this._userFilledOut = formComplete;
    });
  }

  loginValidation() {
    this._requiredLogInUserObservable.subscribe((formComplete: boolean) => {
      console.log(formComplete);
      this._userFilledOut = formComplete;
    });
  }

  getUserComplete() {
    return this._userFilledOut;
  }

  log() {
    console.log(this.data);
  }
}
