import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FetchspecificvalueService {

  constructor(private http: HttpClient) { }

  // Method using subscribe
  queryDataBySpecificValue(featurelayer:string,attribute:string,operator:string,searchvalue:string
  ): Observable<any> {
    return this.http.post<any>('http://127.0.0.1:8080/map/makeqquery',{ 
      selectedLayer: featurelayer,
      selectedAttribute:attribute,
      selectedOperator:operator,
      searchValue:searchvalue

    },);
  }
}
