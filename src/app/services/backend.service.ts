import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class BackendService {
  url: string = "http://localhost:4200/api/"

  constructor(private http: HttpClient) { }

  getTopItemsInCategory() {
    console.log('making request');
    const getUrl = this.url + 'categories/items'
    return this.http.get(getUrl).toPromise();
  }
}