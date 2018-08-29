import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BackendService } from '../../services/backend.service';

@Component({
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})

export class ItemComponent implements OnInit {
  item: object;

  constructor(
    private router: Router,
    private backend: BackendService,
    private activatedRouter: ActivatedRoute
  ) { }

  ngOnInit() {
    let itemId = this.activatedRouter.snapshot.paramMap.get('id');
    return this.backend.getItemById(itemId)
    .then(result => {
      console.log('result :', result);
      this.item = result[0];
    })
  }
}