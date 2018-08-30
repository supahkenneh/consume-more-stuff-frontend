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
    photo_id: string;
    status_id: any;
    condition_id: any;
    dimensions: string;
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
    this.editFormData.condition_id = parseInt(this.editFormData.condition_id);
    this.editFormData.status_id = parseInt(this.editFormData.status_id);
    return this.backend.editItem(this.editFormData, this.item.id)
    .then(editedItem => {
      this.item = editedItem[0];
      this.toggleEdit();
    })
  }
}