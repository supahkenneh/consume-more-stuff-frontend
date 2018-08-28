import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from '../../services/backend.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})

export class SidebarComponent implements OnInit {
  categories: any;

  constructor(
    private router: Router,
    private backend: BackendService
  ) { }

  ngOnInit() {
    this.backend.getTopItemsInCategory()
      .then(result => {
        console.log(result);
      })
  }
}