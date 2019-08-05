import { Component, OnInit, OnChanges, ViewChild, ElementRef } from '@angular/core';
import { Category } from '../Shared-Classes-and-Interfaces/category';
import { User } from '../Shared-Classes-and-Interfaces/user';
import { CategoriesServiceService } from '../Services/categories-service.service';
import { Subcategory } from '../Shared-Classes-and-Interfaces/subcategory';
import { CartService } from '../Services/cart.service';
import { Route, Router } from '@angular/router';
import { OfferedItems } from '../Shared-Classes-and-Interfaces/OfferedItems';
import { OfferService } from '../Services/offer.service';
import { UserServicesService } from '../Services/user-services.service';
import { Items } from '../Shared-Classes-and-Interfaces/items';
// import { FilterPipe } from '../filter.pipe';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {


  categoriesList: Category[];
  subcategorylist: Subcategory [];
  token: string;
  catid: number;
  // cartItems: Items[];
  userEmailForSideMenu: string;
founditem: boolean;
  offer = 1;
  offeredItems: OfferedItems[];
  cannotFindIt = false;

  cart = [];
  items = [];
  filteredItems = [];
  filterItems = [];
  searchText: string;
  length: number;
  sliderConfig = {
    slidesPerView: 2,
    spaceBetween: 10,
    centeredSlides: true
  };

  notFoundItem = {
    Item_Name: '',
    weight: '',
    img: '',
  };

  constructor( private categoryservice: CategoriesServiceService,
               private cartService: CartService,
               private router: Router,
               private cartservice: CartService ,
               private offeredproductservice: OfferService,
               private userService: UserServicesService,
              //  private filter: FilterPipe
              ) { }

  ngOnInit() {
    // console.log('OnInit Start ...');
    this.getAllCategories();
    if (localStorage.getItem('cartItems') === '1') {
      this.cart = [];
      // alert(this.cart);
    } else {this.cart = this.cartService.getCart();  }
    this.getAllsubCategories(1);
    this.OfferedProduct();
    this.getAllProducts();
    // this.userEmailForSideMenu = localStorage.getItem('Client_Email');
  }
  ionViewDidEnter() { // like: ngOnChanges() in Angular
    console.log('tamam ................................................');
    if (localStorage.getItem('cartItems') === '1') {
      this.cart = [];
      // alert(this.cart);
    } else {this.cart = this.cartService.getCart();  }
  }

  addToCart(product) {

  if (this.cart.length === 0) {
    product.quantity = 1;
    this.cart.push(product);
  } else {
      var res = this.cart.forEach(e => {
        if (e.ID == product.ID) {
        this.founditem = true; }
      });
      if (this.founditem == true) {
        product.quantity ++;
      } else {
        product.quantity = 1;
        this.cart.push(product);
      }
    }
  this.founditem = false;
  }

  addNotFoundItemToCart() {
    this.addToCart(this.notFoundItem);
  }
  openCart() {
      // let cartLength = this.cart.length;
      // for (let index = 0; index < cartLength; index++) {
        localStorage.setItem(`cartItems`, JSON.stringify(this.cart));
      // }
      // localStorage.setItem('cartItemsCount', cartLength );
      this.router.navigate(['cart']);
      console.log(this.cart);
    }



  getAllCategories() {
    let obj = JSON.parse(localStorage.getItem('Client'));
    this.token = obj.token ;
    if (this.token != null) {
      this.categoryservice.getAll(this.token).subscribe((res) => {
        this.categoriesList = res;
        console.log(this.categoriesList);
      }
      ,
      (err) => {
        console.log('not return data ....');
      });
    }
  }

  getAllsubCategories(catid) {
    let obj = JSON.parse(localStorage.getItem('Client'));
    this.token = obj.token ;
    console.log(this.catid);
    if (this.token != null) {
      this.categoryservice.getAllSubs(catid, this.token).subscribe((res) => {
        this.subcategorylist = res;
        console.log(this.subcategorylist);
      },
      (err) => {
        console.log('not return data ....');
      });
    }
  }

  getproducts(subid) {
    this.offer = 2;
    let obj = JSON.parse(localStorage.getItem('Client'));
    this.token = obj.token ;
    if (this.token != null) {
      this.cartservice.getProducts(subid, this.token).subscribe((res) => {
        this.items = res;
        console.log(this.items[0].Image);
        console.log('items...:' + res + this.items);
      }, (err) => {
        console.log('not return data ....');
      });
    }

  }

  OfferedProduct() {
    let obj = JSON.parse(localStorage.getItem('Client'));
    this.token = obj.token ;
    if (this.token != null) {
        this.offeredproductservice.getAllOfferedProduct(this.token).subscribe(data => {
          this.offeredItems = data;
        });
    }
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
  openSearchFlag() {
    this.offer = 3;
  }
  closeSearchFlag() {
    this.offer = 1;
  }
  openTextOrder() {
    this.cannotFindIt = true;
    console.log(this.cannotFindIt);
  }

  textSearchChanged() {
    console.log(this.filteredItems);
    console.log('change input search');
    // this.filterItems = this.filter.transform(this.filteredItems,this.searchText);
    this.length = 0;
    this.filteredItems.forEach(item => {
      if(item.Item_Name.toLocaleLowerCase().includes(this.searchText)) {
        this.length ++;
      }
    });
    console.log(this.length);
  }
}
