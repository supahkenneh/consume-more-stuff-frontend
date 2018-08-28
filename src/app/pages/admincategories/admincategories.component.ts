import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: './admincategories.component.html',
  styleUrls: ['./admincategories.component.scss']
})

export class AdminCategoriesComponent {

  constructor(
    private router: Router
  ) { }
}