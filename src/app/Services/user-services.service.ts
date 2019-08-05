import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../Shared-Classes-and-Interfaces/user';
import { registeredUser } from '../Shared-Classes-and-Interfaces/registeredUser';
import { Items } from '../Shared-Classes-and-Interfaces/items';
import { orderResponse } from '../Shared-Classes-and-Interfaces/orderResponse';

@Injectable({
  providedIn: 'root'
})
export class UserServicesService {

  constructor(private httpClient: HttpClient) { }

  getUserData(userData): Observable<User> {
    console.log('user logged in...');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept' : '*/*'
      })
    };
    return this.httpClient.post<User>(`${environment.API_URL}/login`, userData, httpOptions);
  }


  registerNewUser(registuser): Observable<registeredUser>{
    console.log('user register in...');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept' : '*/*'
      })
    };
    return this.httpClient.post<registeredUser>(`${environment.API_URL}/RegisterUser`, registuser, httpOptions);
  }

  updateUser(currentUser): Observable<registeredUser> {
    console.log('user register in...');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept' : '*/*'
      })
    };
    return this.httpClient.post<registeredUser>(`${environment.API_URL}/UpdateUserProfile`, currentUser, httpOptions);
  }

  getAllProducts( token): Observable<Items[]> {
    console.log('getAllProductsToSearch service ....');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept' : '*/*',
        'authorization': `bearer ${token}`
      })
    };
    return this.httpClient.get<Items[]>(`${environment.API_URL}/getAllItem`, httpOptions);
  }

  getAllResponses(orderID, token): Observable<orderResponse[]> {
    console.log('getAllResponses service ....');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept' : '*/*',
        'authorization': `bearer ${token}`
      })
    };
    return this.httpClient.post<orderResponse[]>(`${environment.API_URL}/getAllResponses`, orderID, httpOptions);
  }

  getResponseDetails(responseID, token) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept' : '*/*',
        'authorization': `bearer ${token}`
      })
    };
    return this.httpClient.get<any[]>(`${environment.API_URL}/getAllResponsesDetails/${responseID}`, httpOptions);
  }
}
