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
  photo_link: string;

  photosToUpload: File[] = [];
  acceptableExtensions: string[] = ['.jpg', '.png', '.jpeg']
  acceptableSize: number = 1000000000;
  showPhotoError: boolean = false;
  unacceptablePhoto: string = 'File format not accepted, please upload .jpg, .jpeg, or .png';
  unacceptableSize: string = 'File size exceeded, max 1GB'
  photoErrors: string[] = [];

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
    photo: File;
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
      photo_id: -1,
      photo: null
    };

  descriptionErrors: string[] = [];
  descriptionValid: boolean = false;

  categoryErrors: string[] = [];
  categoryValid: boolean = false;

  conditionErrors: string[] = [];
  conditionValid: boolean = false;


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
    });
  }

  addItem() {
    this.newItemFormData.created_by = this.user.user_id;
    
    return this.backend.postItem(this.newItemFormData)
      .then(item => {
        const id = item['id']
        return this.router.navigate([`items/${id}`]);
      })
      .catch(err => {
        console.log(err);
      });
  }

  validateDescription() {
    this.descriptionErrors.length = 0;
    if (this.newItemFormData.description.length < 3) {
      this.descriptionErrors.push('At least 3 characters required')
      this.descriptionValid = false;
    } else {
      this.descriptionValid = true;
    }
  }

  validateCategory() {
    this.categoryErrors.length = 0;
    if (this.newItemFormData.category_id > -1 && !isNaN(this.newItemFormData.category_id)) {
      this.categoryValid = true;
    } else {
      this.categoryErrors.push('Category is required');
      this.categoryValid = false;
    }
  }

  validateCondition() {
    this.conditionErrors.length = 0;
    if (this.newItemFormData.condition_id > -1 && !isNaN(this.newItemFormData.condition_id)) {
      this.conditionValid = true;
    } else {
      this.conditionErrors.push('Condition is required');
      this.conditionValid = false;
    }
  }

  getDescriptionErrors() {
    return this.descriptionErrors.join(', ');
  }

  getCategoryErrors() {
    return this.categoryErrors.join(', ');
  }

  getConditionErrors() {
    return this.conditionErrors.join(', ');
  }

  disableButton() {
    return !(this.conditionValid && this.categoryValid && this.descriptionValid)
  }

  updatePhotoList(event) {
    let file = event.target.files[0];
    let fileSize = file.size
    let dot = file.name.indexOf('.');
    let extension = file.name.slice(dot, file.name.length);
    if (this.acceptableExtensions.includes(extension.toLowerCase())) {
      if (fileSize < this.acceptableSize) {
        return this.newItemFormData.photo = file
        // return this.photosToUpload.push(file);
      } else {
        return this.photoErrors.push(this.unacceptableSize);
      }
    } else {
      return this.photoErrors.push(this.unacceptablePhoto)
    }
  }

  getPhotoErrors() {
    return this.photoErrors.join(', ');
  }

  displayPhotoFiles() {
    return this.photosToUpload;
  }
}
