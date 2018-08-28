import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from '../../services/backend.service';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  constructor(
    private router: Router,
    private backend: BackendService
  ) { }

  ngOnInit() {
    console.log('home');
    return this.backend.getTopItemsInCategory()
    // .then(result => {
    //   // console.log('result :', result);
    // })
  }
}