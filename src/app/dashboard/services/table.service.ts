import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TableService {

  constructor(private _http: HttpClient) {}

  getUsers() {
    return this._http.get('https://jsonplaceholder.typicode.com/posts');
  }
}
