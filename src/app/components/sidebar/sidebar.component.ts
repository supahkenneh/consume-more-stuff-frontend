import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from '../../services/backend.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})

export class SidebarComponent implements OnInit {
  categories: string[];

  constructor(
    private router: Router,
    private backend: BackendService
  ) { }

  ngOnInit() {
    let categoryNames = [];
    return this.backend.getTopItemsInCategory()
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
      .catch(err => console.log(err))
  }
}