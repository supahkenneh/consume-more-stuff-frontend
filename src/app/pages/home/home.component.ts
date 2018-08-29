import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from '../../services/backend.service';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  categories: any;
  categoryItems: any;

  constructor(
    private router: Router,
    private backend: BackendService
  ) { }

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
}