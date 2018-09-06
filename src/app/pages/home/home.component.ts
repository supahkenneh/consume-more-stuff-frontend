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
  showItems: boolean = false;
  user: object;
  placeholderImage: string = "https://cdn.samsung.com/etc/designs/smg/global/imgs/support/cont/NO_IMG_600x600.png"

  private _isLoggedInAsObservable;
  private _isLoggedIn: boolean;

  constructor(
    private router: Router,
    private backend: BackendService,
    private session: SessionService,
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
        let resultArr = Object.values(result);
        resultArr.map(item => {
          if (item.photos.length > 0) {
            item.photo = item.photos[0].link;
          } else {
            item.photo = this.placeholderImage;
          }
        })
        if (resultArr.length > 5) {
          resultArr.length = 5;
        }
        return this.categoryItems = resultArr;
      })
      .then(() => {
        let categoryDiv = document.getElementById(category.id)
        let itemContainer = document.getElementsByClassName('item-list-container')[0];
        categoryDiv.appendChild(itemContainer);
      })
  }

  toggle() {
    if (this.showItems) {
      return this.showItems = false;
    } else {
      return this.showItems = true;
    }
  }
}