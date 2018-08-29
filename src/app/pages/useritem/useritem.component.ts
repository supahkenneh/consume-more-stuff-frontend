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
  userItems: any;
  pendingItems: any = [];
  publishedItems: any = [];
  soldItems: any = [];

  showPending: boolean = false;
  showPublished: boolean = false;
  showSold: boolean = false;

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
        let responseArr = Object.values(response);
        responseArr.map(item => {
          if (item.itemStatus.name === 'pending') {
            this.pendingItems.push(item);
          } else if (item.itemStatus.name === 'published') {
            this.publishedItems.push(item);
          } else if (item.itemStatus.name === 'sold') {
            this.soldItems.push(item);
          }
        })
      })
  }

  togglePending() {
    if (this.showPending) {
      return this.showPending = false;
    } else {
      return this.showPending = true;
    }
  }

  togglePublished() {
    if (this.showPublished) {
      return this.showPublished = false;
    } else {
      return this.showPublished = true;
    }
  }

  toggleSold() {
    if (this.showSold) {
      return this.showSold = false;
    } else {
      return this.showSold = false;
    }
  }

}
