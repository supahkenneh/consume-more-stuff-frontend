import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from '../../services/backend.service';
import { SessionService } from '../../services/session.service';

@Component({
  templateUrl: './additem.component.html',
  styleUrls: ['./additem.component.scss']
})
export class AddItemComponent {
  user: {
    username: string;
    user_id: number;
    email: string;
  };
  conditions: object;
  categories: object;

  photo: object;
  loggedIn: boolean;

  newItemFormData: {
    description: string;
    price: string;
    manufacturer_make: string;
    created_by: number;
    model_name_number: string;
    condition_id: number;
    category_id: number;
    views: number;
    dimensions: string;
    notes_details: string;
    status_id: number;
    photo_id: number;
  } = {
    description: '',
    price: '',
    manufacturer_make: '',
    created_by: -1,
    model_name_number: '',
    condition_id: -1,
    category_id: -1,
    views: 0,
    dimensions: '',
    notes_details: '',
    status_id: 2,
    photo_id: -1
  };

  constructor(
    private router: Router,
    private backend: BackendService,
    private session: SessionService
  ) {
    this.user = this.session.getSession();
    this.backend.getCategories().then(response => {
      this.categories = response;
    });

    this.backend.getConditions().then(response => {
      this.conditions = response;
      console.log(this.conditions);
    });
  }

  addItem() {
    this.newItemFormData.created_by = this.user.user_id;
    console.log(this.newItemFormData);
  }
}
