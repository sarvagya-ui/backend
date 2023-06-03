import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private _httpClient: HttpClient) {}

  get(url: string): Observable<any> {
    return this._httpClient.get(url);
  }

  post(url: string, model: any): Observable<any> {
    const body = JSON.stringify(model);
    return this._httpClient.post(url, body);
  }

  postImage(url: string, model: any): Observable<any> {
    //this key from header will be removed in headerInterceptor
    let httpHeaders = new HttpHeaders().set('isImage', '');

    return this._httpClient.post(url, model, {
      headers: httpHeaders,
    });
  }

  put(url: string, Id: number, model: any): Observable<any> {
    const body = JSON.stringify(model);
    return this._httpClient.put(url + Id, body);
  }

  delete(url: string, Id: number): Observable<any> {
    return this._httpClient.delete(url + Id);
  }
}
