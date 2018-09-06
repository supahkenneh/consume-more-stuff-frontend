import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from '../../services/backend.service';

@Component({
  templateUrl: './allitems.component.html',
  styleUrls: ['./allitems.component.scss']
})

export class AllItemsComponent implements OnInit {
  itemList: any;
  placeholderImage: string = "https://cdn.samsung.com/etc/designs/smg/global/imgs/support/cont/NO_IMG_600x600.png"

  constructor(
    private router: Router,
    private backend: BackendService
  ) { }

  ngOnInit() {
    return this.backend.getAllItems()
      .then(result => {
        let resultArr = Object.values(result);
        resultArr.map(item => {
          if (item.photos.length > 0) {
            item.photo = item.photos[0].link;
          } else {
            item.photo = this.placeholderImage;
          }
        })
        this.itemList = resultArr;
      })
  }
}