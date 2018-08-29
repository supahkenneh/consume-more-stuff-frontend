import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from '../../services/backend.service';
import { SessionService } from '../../services/session.service';

@Component({
  templateUrl: './useritem.component.html',
  styleUrls: ['./useritem.component.scss']
})
export class UserItemComponent {
  loginFormData: {
    username: string;
    password: string;
  } = {
    username: '',
    password: ''
  };

  constructor(
    private router: Router, 
    private session: SessionService,
    private backend: BackendService
  ) {}


}
