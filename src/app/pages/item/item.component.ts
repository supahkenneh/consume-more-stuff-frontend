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

  itemId: string;

  photos: string[] = [];
  currentPhoto: string;
  hasPhoto: boolean = false;

  acceptableExtensions: string[] = ['.jpg', '.png', '.jpeg']
  acceptableSize: number = 1000000000;
  showPhotoError: boolean = false;
  unacceptablePhoto: string = 'File format not accepted, please upload .jpg, .jpeg, or .png';
  unacceptableSize: string = 'File size exceeded, max 1GB'
  photoErrors: string[] = [];

  photosToUpload: File[] = [];
  photosToDelete: string[] = [];

  editFormData: {
    description: string;
    status_id: any;
    condition_id: any;
    dimensions: string;
    manufacturer_make: string;
    model_name_number: string;
    notes_details: string;
    itemStatus: object;
    condition: object;
  } = {
      description: '',
      status_id: '',
      condition_id: '',
      dimensions: '',
      manufacturer_make: '',
      model_name_number: '',
      notes_details: '',
      itemStatus: {},
      condition: {},
    };

  descriptionErrors: string[] = [];
  descriptionValid: boolean = false;

  conditionErrors: string[] = [];
  conditionValid: boolean = false;

  statusErrors: string[] = [];
  statusValid: boolean = false;

  constructor(
    private router: Router,
    private backend: BackendService,
    private session: SessionService,
    private activatedRouter: ActivatedRoute
  ) {
    this.user = this.session.getSession();
    this.currentPhoto = this.photos[0];
  }

  ngOnInit() {
    this.hasPhoto = false;
    this.itemId = this.activatedRouter.snapshot.paramMap.get('id');
    return this.backend.incrementViews(this.itemId)
      .then(() => {
        return this.backend.getItemById(this.itemId)
          .then(result => {
            console.log(result);
            this.editFormData = result[0];
            this.item = { ...result[0] };
            if (this.item.photos.length > 0) {
              this.item.photos.map(photo => {
                this.photos.push(photo.link);
              })
              this.currentPhoto = this.photos[0];
              this.hasPhoto = true;
            } else {
              this.hasPhoto = false;
            }
            if (result[0].created_by === this.user['user_id']) {
              this.correctUser = true;
            }
            return (this.editFormData = result[0]);
          });
      })

  }

  toggleEdit() {
    if (this.editing) {
      this.editFormData = this.item;
      return (this.editing = false);
    } else {
      return (this.editing = true);
    }
  }

  submitEdit() {
    this.editFormData.condition_id = parseInt(this.editFormData.condition_id);
    this.editFormData.status_id = parseInt(this.editFormData.status_id);
    this.editFormData['photo'] = this.photosToUpload;
    if (this.photosToDelete.length !== 0) {
      this.photosToDelete.push(this.itemId);
      this.backend.deletePhotos(this.photosToDelete)
    }
    return this.backend.editItem(this.editFormData, this.item.id)
      .then(editedItem => {
        //reset array of photos
        this.photos.length = 0;
        // //if editedItem has photos, then populate this.photo array with photos
        if (editedItem[0].photos.length > 0) {
          editedItem[0].photos.map(photo => {
            this.photos.push(photo.link);
          })
          this.hasPhoto = true;
        } else {
          this.hasPhoto = false;
        }
        //resetting to defaults
        this.photosToUpload.length = 0;
        this.currentPhoto = this.photos[0];
        this.item = editedItem[0];
        this.editFormData = editedItem[0];
        this.toggleEdit();
      });
  }

  removeItem() {
    return this.backend.removeItem(this.itemId)
      .then(result => {
        return this.router.navigate(['/user/items'])
      })
  }



  /******** FUNCTIONS REGARDING FORM VALIDATIONS ********/

  validateDescription() {
    this.descriptionErrors.length = 0;
    if (this.editFormData.description.length < 3) {
      this.descriptionErrors.push('At least 3 characters required');
      this.descriptionValid = false;
    } else {
      this.descriptionValid = true;
    }
  }

  getDescriptionErrors() {
    return this.descriptionErrors.join(', ');
  }

  validateStatus() {
    this.statusErrors.length = 0;
    if (this.editFormData.status_id > 0) {
      this.statusValid = true;
    } else {
      this.statusErrors.push('Status is required');
      this.statusValid = false;
    }
  }

  getStatusErrors() {
    return this.statusErrors.join(', ');
  }

  validateCondition() {
    this.conditionErrors.length = 0;
    if (this.editFormData.condition_id > 0) {
      this.conditionValid = true;
    } else {
      this.conditionErrors.push('Condition is required');
      this.conditionValid = false;
    }
  }

  getConditionErrors() {
    return this.conditionErrors.join(', ');
  }

  disableButton() {
    if (
      this.conditionErrors.length ||
      this.statusErrors.length ||
      this.descriptionErrors.length
    ) {
      return true;
    } else {
      return false;
    }
  }

  /******** FUNCTIONS REGARDING PHOTOS ********/

  previousPhoto() {
    let index = this.photos.indexOf(this.currentPhoto);
    if ((index - 1) < 0) {
      return this.currentPhoto = this.photos[this.photos.length - 1]
    }
    return this.currentPhoto = this.photos[index - 1]
  }

  nextPhoto() {
    let index = this.photos.indexOf(this.currentPhoto);
    if ((index + 1) === this.photos.length) {
      return this.currentPhoto = this.photos[0]
    }
    return this.currentPhoto = this.photos[index + 1]
  }

  imagesRemaining() {
    let index = this.photos.indexOf(this.currentPhoto);
    return `${index + 1} of ${this.photos.length} images`
  }

  updatePhotoList(event) {
    let file = event.target.files[0];
    let fileSize = file.size
    let dot = file.name.indexOf('.');
    let extension = file.name.slice(dot, file.name.length);
    if (this.acceptableExtensions.includes(extension.toLowerCase())) {
      if (fileSize < this.acceptableSize) {
        return this.photosToUpload.push(file)
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

  getPhotosToDelete() {
    if (this.photosToDelete.length !== 0 && this.photosToDelete.length < this.photos.length) {
      return `${this.photosToDelete.length} images selected`;
    } else if (this.photosToDelete.length >= this.photos.length) {
      this.photosToDelete = this.photos
      return `${this.photosToDelete.length} images selected`
    } else {
      document.getElementById('photos-marked').style.display === 'none';
    }
  }

  tagForRemoval() {
    if (this.photosToDelete.length < this.photos.length) {
      return this.photosToDelete.push(this.currentPhoto);
    }
  }
}
