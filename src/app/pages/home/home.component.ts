import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from '../../services/backend.service';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  categories: string[];
  categoryItems: any;

  constructor(
    private router: Router,
    private backend: BackendService
  ) { }

  ngOnInit() {
    let categoryNames = [];
    return this.backend.getColumns()
      .then(result => {
        let resultArr = Object.values(result);
        resultArr.map(category => {
          category.name = category.name.charAt(0).toUpperCase() + category.name.substring(1);
          categoryNames.push(category.name);
        })
      })
      .then(() => {
        return this.categories = categoryNames;
      })
  }

  loadItems(category) {
    category = category.toLowerCase();
    return this.backend.getTopItemsInCategory()
      .then(result => {
        let resultArr = Object.values(result);
        return resultArr.filter(index => {
          if (index.name === category) {
            return index;
          }
        })
      })
      .then(result => {
        return this.categoryItems = result[0].items;
      })
  }
}