import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../Shared-Classes-and-Interfaces/category';
import { environment } from 'src/environments/environment';
import { Subcategory } from '../Shared-Classes-and-Interfaces/subcategory';

@Injectable({
  providedIn: 'root'
})
export class CategoriesServiceService {

  constructor(private httpclient: HttpClient) { }

  getAll(token): Observable<Category[]> {
    console.log('getallcategory service ....');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept' : '*/*',
        'authorization': `bearer ${token}`
      })
    };
    return this.httpclient.get<Category[]>(`${environment.API_URL}/getCategories`, httpOptions);
  }

  getOne() {}

  getAllSubs(catID, token): Observable<Subcategory[]> {
    console.log('getallsubcategory service ....');
    console.log(catID);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept' : '*/*',
        'authorization': `bearer ${token}`
      })
    };
    return this.httpclient.get<Subcategory[]>(`${environment.API_URL}/getSubCatByCatID/${catID}`, httpOptions);
  }
}
