import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OfferedItems } from '../Shared-Classes-and-Interfaces/OfferedItems';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OfferService {

  constructor( private httpclient: HttpClient) { }
  getAllOfferedProduct( token): Observable<OfferedItems[]> {
    console.log('offeredproduct service ....');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept' : '*/*',
        'authorization': `bearer ${token}`
      })
    };
    return this.httpclient.get<OfferedItems[]>(`${environment.API_URL}/getAllItemWithOffer`, httpOptions);
  }

}
