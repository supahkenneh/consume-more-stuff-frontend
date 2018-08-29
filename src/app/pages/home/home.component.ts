import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from '../../services/backend.service';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  categories: string[];

  constructor(
    private router: Router,
    private backend: BackendService
  ) { }

  ngOnInit() {
    return this.backend.getColumns()
      .then(result => {
        console.log(result);
      })
    // let categoryNames = [];
    // return this.backend.getTopItemsInCategory()
    //   .then(result => {
    //     let resultArr = Object.values(result);
    //     resultArr.map(category => {
    //       category.name = category.name.charAt(0).toUpperCase() + category.name.substring(1);
    //       categoryNames.push(category.name);
    //     })
    //   })
    //   .then(() => {
    //     return this.categories = categoryNames;
    //   })
  }

  // loadItems(category) {
  //   return this.backend.getTopItemsInCategory()
  //     .then(result => {
  //       let resultArr = Object.values(result);
  //       return resultArr.filter(category => {
  //         return category.name = category
  //       })
  //     })
  //     .then(result => {
  //       console.log('result :', result);
  //     })
  // }
}