import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormDataValidation {
  private _userFilledOut: boolean = false;
  private _requiredItemObservable: Observable<boolean>;
  private _requiredUserObservable: Observable<boolean>;

  require: object;
  data: object;
  constructor() {}

  itemFieldInit(data) {
    this._requiredItemObservable = new Observable(observer => {
      if (
        data['description'] &&
        data['condition'] &&
        data['category_id'] &&
        data['status_id'] &&
        data['description']
      ) {
        observer.next(true);
      } else {
        observer.next(false);
      }
    });
  }

  userFieldInit(data) {
    this.data = data;
    console.log(this.data);
    this._requiredUserObservable = new Observable(observer => {
      if (this.data['username'] && this.data['email'] && this.data['password']) {
        observer.next(true);
      } else {
        observer.next(false);
      }
    });
  }

  userValidation() {
    this._requiredUserObservable.subscribe((formComplete: boolean) => {
      console.log(formComplete);
      this._userFilledOut = formComplete;
    });
  }

  getUserComplete(){
    return this._userFilledOut;
  }

  log() {
    console.log(this.data);
  }
}
