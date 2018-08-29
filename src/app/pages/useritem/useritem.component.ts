import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from '../../services/backend.service';
import { SessionService } from '../../services/session.service';

@Component({
  templateUrl: './useritem.component.html',
  styleUrls: ['./useritem.component.scss']
})
export class UserItemComponent implements OnInit {
  user: object;

  constructor(
    private router: Router,
    private session: SessionService,
    private backend: BackendService
  ) {
    this.user = this.session.getSession();
  }

  ngOnInit() {
    return this.backend.getUsersItems()
    .then(response => {
      console.log(response);
    })
  }


}
