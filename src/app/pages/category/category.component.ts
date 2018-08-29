import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from '../../services/backend.service';

@Component({
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})

export class CategoryComponent implements OnInit {
  categories: string[];

  constructor(
    private router: Router,
    private backend: BackendService
  ) { }

  ngOnInit() {

  }
}