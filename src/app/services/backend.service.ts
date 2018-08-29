import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class BackendService {
  url: string = "http://localhost:4200/api/"

  constructor(private http: HttpClient) { }

  getColumns() {
    console.log('getting columns');
    const getUrl = this.url + 'categories'
    console.log('getUrl :', getUrl);
    return this.http.get(getUrl).toPromise();
  }

  getTopItemsInCategory() {
    const getUrl = this.url + 'categories/items'
    return this.http.get(getUrl).toPromise();
  }
}