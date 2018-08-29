import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  url: string = 'http://localhost:4200/api/';

  constructor(private http: HttpClient) { }

  getColumns() {
    const getUrl = this.url + 'categories'
    return this.http.get(getUrl).toPromise();
  }

  getTopItemsInCategory() {
    const getUrl = this.url + 'categories/items'
    return this.http.get(getUrl).toPromise();
  }

  getCategoryItems(id) {
    const getUrl = this.url + `categories/${id}/items`
    return this.http.get(getUrl).toPromise();
  }

  getAllItems() {
    const getUrl = this.url + 'categories/items'
    console.log(getUrl);
    return this.http.get(getUrl).toPromise();
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
}
