import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FechallfeaturelayersService {

  constructor(private http: HttpClient) { }

  // Method using subscribe
  queryAllFeatureLayers(): Observable<any> {
    return this.http.post<any>('http://127.0.0.1:8080/map/searchallfeaturelayersdata',{});
  }
}
