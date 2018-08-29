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
  showItems: boolean = false;

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

  loadItems(categoryId) {
    return this.backend.getCategoryItems(categoryId)
      .then(result => {
        this.showItems = true;
        return this.categoryItems = result;
      })
  }
}