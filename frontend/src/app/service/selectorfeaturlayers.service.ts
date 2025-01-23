import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SelectorfeaturlayersService {

  private backenddata:any[]= []

  constructor(private http: HttpClient) { }

  // Method using subscribe
  querySelectorFeatureLayers(): Observable<any> {
    return this.http.get<any>('http://127.0.0.1:8080/map/featurelayers');
  }

  // Optional method to get the stored backend data
 
}
