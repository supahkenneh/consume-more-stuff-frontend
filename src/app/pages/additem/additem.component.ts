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
      console.log('response :', response);
      this.conditions = response;
      console.log(this.conditions);
    });
  }

  addItem() {
    this.newItemFormData.created_by = this.user.user_id;
    console.log(this.newItemFormData);
    return this.backend
      .postPhoto({ link: this.photo_link })
      .then(photo => {
        this.newItemFormData.photo_id = photo['id'];
        return this.newItemFormData;
      })
      .then(newItemData => {
        console.log('after photo', newItemData);
        return this.backend.postItem(newItemData);
      })
      .then(newItem => {
        console.log('newItem', newItem);
        this.router.navigate([`items/${newItem['id']}`]);
      })
      .catch(err => {
        console.log(err);
      });
  }

  updatePhotoList(event) {
    // const photoListDiv = document.getElementById('photo-list-container');
    console.log(event.target.files);
    this.photosToUpload.push(event.target.files);
    console.log('photo array ', this.photosToUpload);
    // const photoFileName = document.createElement('div');
    // photoFileName.innerHTML = event.target.files[0].name;
    // photoListDiv.appendChild(photoFileName);
  }

  uploadImages() {
    return this.backend.uploadPhotos(this.photosToUpload)
    // .then(response => {
    //   console.log(response);
    // })
  }
}
