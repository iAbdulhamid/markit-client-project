import { Component, OnInit } from '@angular/core';
import { UserServicesService } from '../Services/user-services.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  filteredItems = [];
  searchText: string;
  token: string;
  cart = [];
  founditem: boolean;
  constructor(private userService: UserServicesService) { }

  ngOnInit() {
   this.getAllProducts();
  }

  addToCart(product) {
    // this.cartService.addProduct(product);

  if (this.cart.length === 0)
  {
    product.quantity = 1;
    this.cart.push(product);
  } else {
      var res = this.cart.forEach(e => {
        if (e.ID ==product.ID){
        this.founditem= true; }
      });
      if(this.founditem == true){
        product.quantity ++;
      }else {
        product.quantity = 1;
        this.cart.push(product);
      }
    }
    this.founditem= false;

  }

  getAllProducts() {
    let obj = JSON.parse(localStorage.getItem('Client'));
    this.token = obj.token ;
    if (this.token != null) {
      this.userService.getAllProducts(this.token).subscribe(data => {
        this.filteredItems = data;
      });
    }
  }

}
