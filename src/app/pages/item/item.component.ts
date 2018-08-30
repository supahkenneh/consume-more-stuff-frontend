import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BackendService } from '../../services/backend.service';
import { SessionService } from '../../services/session.service';

@Component({
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})

export class ItemComponent implements OnInit {
  user: object;
  item: any;
  editing: boolean = false;
  correctUser: boolean = false;

  editFormData: {
    description: string;
    photo: string;
    status: string;
    condition: string;
    manufacturer_make: string;
    model_name_number: string;
    notes_details: string;
  }

  constructor(
    private router: Router,
    private backend: BackendService,
    private session: SessionService,
    private activatedRouter: ActivatedRoute
  ) {
    this.user = this.session.getSession();
  }

  ngOnInit() {
    let itemId = this.activatedRouter.snapshot.paramMap.get('id');
    return this.backend.getItemById(itemId)
      .then(result => {
        this.editFormData = result[0];
        if (result[0].created_by === this.user['user_id']) {
          this.correctUser = true;
        }
        return this.item = result[0];
      })
  }

  toggleEdit() {
    if (this.editing) {
      return this.editing = false;
    } else {
      return this.editing = true;
    }
  }

  submitEdit() {
    console.log(this.editFormData);
    console.log('this.item :', this.item);
    console.log('this.user', this.user)
  }
}