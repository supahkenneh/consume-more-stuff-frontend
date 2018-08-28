import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: './adminusers.component.html',
  styleUrls: ['./adminusers.component.scss']
})

export class AdminUsersComponent {

  constructor(
    private router: Router
  ) { }
}