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
    itemStatus: object;
    condition: object;
  } = {
    description: '',
    photo_id: '',
    status_id: '',
    condition_id: '',
    dimensions: '',
    manufacturer_make: '',
    model_name_number: '',
    notes_details: '',
    itemStatus: {},
    condition: {}
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
  }

  ngOnInit() {
    let itemId = this.activatedRouter.snapshot.paramMap.get('id');
    return this.backend.incrementViews(itemId).then(() => {
      return this.backend.getItemById(itemId).then(result => {
        this.editFormData = result[0];
        this.item = { ...result[0] };
        if (result[0].created_by === this.user['user_id']) {
          this.correctUser = true;
        }
        return (this.editFormData = result[0]);
      });
    })

  }

  toggleEdit() {
    if (this.editing) {
      console.log(this.item);
      this.editFormData = this.item;
      return (this.editing = false);
    } else {
      return (this.editing = true);
    }
  }

  submitEdit() {
    this.editFormData.condition_id = parseInt(this.editFormData.condition_id);
    this.editFormData.status_id = parseInt(this.editFormData.status_id);
    return this.backend.editItem(this.editFormData, this.item.id).then(editedItem => {
      this.item = editedItem[0];
      this.toggleEdit();
    });
  }

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
}
