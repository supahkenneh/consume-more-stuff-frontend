import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: './additem.component.html',
  styleUrls: ['./additem.component.scss']
})

export class AddItemComponent {

  constructor(
    private router: Router
  ) { }
}