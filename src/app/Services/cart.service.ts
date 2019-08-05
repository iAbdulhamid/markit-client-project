import { Injectable } from '@angular/core';
import { Items } from '../Shared-Classes-and-Interfaces/items';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cart = [];
  private data: Items[];

  constructor( private httpclient: HttpClient) { }


  getProducts(subID, token): Observable<Items[]> {
    console.log('item service ....');
    console.log(subID);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept' : '*/*',
        'authorization': `bearer ${token}`
      })
    };
    return this.httpclient.get<Items[]>(`${environment.API_URL}/getItemBySubCatID/${subID}`, httpOptions);
  }
  getCart() {
    return this.cart;
  }
  addProduct(product) {
    this.cart.push(product);
  }

  placeOrder(order, token): Observable<any> {
    console.log('place order ...');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept' : '*/*',
        'authorization': `bearer ${token}`
      })
    };
    return this.httpclient.post<any>(`${environment.API_URL}/newRequest`, order, httpOptions);
  }

  checkPromoCode(promoCode, token): Observable<any> {
    console.log('checking Promo Code ...');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept' : '*/*',
        'authorization': `bearer ${token}`
      })
    };
    return this.httpclient.post<any>(`${environment.API_URL}/CheckPromoCode`, promoCode, httpOptions);
  }
}
