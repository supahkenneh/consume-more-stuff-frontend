import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from '../../services/backend.service';

@Component({
  templateUrl: './allitems.component.html',
  styleUrls: ['./allitems.component.scss']
})

export class AllItemsComponent implements OnInit {
  itemList: any;

  constructor(
    private router: Router,
    private backend: BackendService
  ) { }

  ngOnInit() {
    return this.backend.getAllItems()
    .then(result => {
      this.itemList = result;
    })
  }
}