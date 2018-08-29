import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BackendService } from '../../services/backend.service';

@Component({
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})

export class CategoryComponent implements OnInit {
  categories: string[];
  categoryId: string;
  itemList: any;

  constructor(
    private router: Router,
    private backend: BackendService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.categoryId = this.activatedRoute.snapshot.paramMap.get('id');
    return this.backend.getCategoryItems(this.categoryId)
    .then(result => {
      return this.itemList = result;
    })
  }
}