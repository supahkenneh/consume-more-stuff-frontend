import { Component, OnInit, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from '../../services/backend.service';
import { SessionService } from '../../services/session.service';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  categories: any;
  categoryItems: any;
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

  loadItems(category) {
    return this.backend.getCategoryItems(category.id)
      .then(result => {
        return this.categoryItems = result;
      })
      .then(() => {
        let categoryDiv = document.getElementById(category.id)
        let itemContainer = document.getElementsByClassName('item-list-container')[0];
        categoryDiv.appendChild(itemContainer);
      })
  }

  navigate(categoryId){
    console.log(categoryId);
    return this.router.navigate([`/category/${categoryId}/items`])
  }
}