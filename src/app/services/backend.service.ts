import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  url: string = 'http://localhost:4200/api/';

  constructor(private http: HttpClient) {}

  postItem(data) {
    const form = new FormData()

    form.append('description', data.description);
    form.append('price', data.price);
    form.append('manufacturer_make', data.manufacturer_make);
    form.append('created_by', data.created_by);
    form.append('model_name_number', data.model_name_number)
    form.append('condition_id', data.condition_id);
    form.append('category_id', data.category_id);
    form.append('views', data.views);
    form.append('dimensions', data.dimensions);
    form.append('notes_details', data.notes_details);
    form.append('status_id', data.status_id);
    form.append('photo', data.photo);

    const postItemUrl = `${this.url}items`;
    return this.http.post(postItemUrl, form).toPromise();
  }

  postPhoto(data) {
    const postPhotoUrl = `${this.url}photos`;
    return this.http.post(postPhotoUrl, data).toPromise();
  }

  getColumns() {
    const getUrl = this.url + 'categories';
    return this.http.get(getUrl).toPromise();
  }

  // getTopItemsInCategory(categoryId) {
  //   const getUrl = this.url + 'categories/items'
  //   return this.http.get(getUrl, categoryId).toPromise();
  // }

  getCategories() {
    const getCatUrl = this.url + `categories/`;
    return this.http.get(getCatUrl).toPromise();
  }

  getConditions() {
    const getConditionUrl = this.url + `conditions/`;
    return this.http.get(getConditionUrl).toPromise();
  }

  getCategoryItems(id) {
    const getUrl = this.url + `categories/${id}/items`;
    return this.http.get(getUrl).toPromise();
  }

  getAllItems() {
    const getUrl = this.url + 'items';
    return this.http.get(getUrl).toPromise();
  }

  getItemById(itemId) {
    const getUrl = this.url + `items/${itemId}`;
    return this.http.get(getUrl).toPromise();
  }

  getUsersItems() {
    const getUrl = this.url + 'user/items';
    return this.http.get(getUrl).toPromise();
  }

  editItem(data, id) {
    const putUrl = this.url + `items/${id}`;
    return this.http.put(putUrl, data).toPromise();
  }

  register(data) {
    const registerUrl = `${this.url}register`;
    return this.http.post(registerUrl, data).toPromise();
  }

  login(data) {
    const loginUrl = `${this.url}login`;
    return this.http.post(loginUrl, data).toPromise();
  }

  logout() {
    const logoutUrl = `${this.url}logout`;
    return this.http.get(logoutUrl).toPromise();
  }

  changePassword(data) {
    const checkUrl = this.url + 'user/settings';
    return this.http.put(checkUrl, data).toPromise();
  }

  uploadPhotos(data) {
    const uploadPhotoUrl = this.url + 'items/photos'
    return this.http.post(uploadPhotoUrl, data).toPromise();
  }

  checkUsername(username) {
    console.log('checkuser');
    const checkUserUrl = `${this.url}user?username=${username}`;
    return this.http.get(checkUserUrl).toPromise();
  }

  checkEmail(email) {
    console.log('checkemail');
    const checkEmailUrl = `${this.url}user?email=${email}`;
    return this.http.get(checkEmailUrl).toPromise();
  }

  incrementViews(itemID) {
    const checkViewsUrl = `${this.url}items/${itemID}/views`;
    return this.http.put(checkViewsUrl,itemID).toPromise();
  }
}
