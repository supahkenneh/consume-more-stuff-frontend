import { Injectable } from '@angular/core';
import { BackendService } from './backend.service';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private backend: BackendService, private session: SessionService) {}

  register(data) {
    return this.backend.register(data);
  }

  login(data) {
    console.log('hit auth');
    return this.backend.login(data).then(response => {
      if (response) {
        return this.session.setSession(data);
      }
    });
  }

  logout() {
    return this.backend.logout().then(response => {
      return this.session.clearSession();
    });
  }
}
