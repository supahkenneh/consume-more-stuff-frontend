import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from '../../services/backend.service';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})

export class SidebarComponent implements OnInit {
  categories: any;
  user: object;
  private _isLoggedInAsObservable;
  private _isLoggedIn: boolean;

  constructor(
    private router: Router,
    private backend: BackendService,
    private session: SessionService
  ) {
    this.user = this.session.getSession();
    this._isLoggedInAsObservable = this.session.isLoggedInAsAnObservable();
  }

  ngOnInit() {
    return this.backend.getColumns()
      .then(result => {
        return this.categories = result;
      })
  }
}