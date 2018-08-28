import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: './adminitems.component.html',
  styleUrls: ['./adminitems.component.scss']
})

export class AdminItemsComponent {

  constructor(
    private router: Router
  ) { }
}