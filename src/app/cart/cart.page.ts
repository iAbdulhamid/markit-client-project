
import { Component, OnInit } from '@angular/core';
import { CartService } from '../Services/cart.service';
import { Router } from '@angular/router';

 
@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit { 

  selectedItems = [];
  total = 0;
  client: any;
  token: string;
  listOrderDetail: any[];
  odjpromocode = { Code: '' };
  promoCodeResult: {};

  orderObj = {
    Notes: '',
    ClientID_FK: 0,
    ShippingAdd_FK: '7',
    PromoCodeFK: this.odjpromocode.Code,
    ItemsDetailsList: [{
      quantity: 0,
      Item_Name: '',
      Item_Brand: '',
      Item_Weight: '',
      Discount: 0 ,
    }]
  };

constructor(private cartService: CartService,
            private router: Router) { }

  ngOnInit() {
    let obj = JSON.parse(localStorage.getItem('cartItems'));
    obj.forEach(e => {
      this.selectedItems.push(e);
    });
    // console.log('selectedItems' + this.selectedItems);
    // console.log(obj);
  }
  decreaseProductCount(itm) {
    if (itm.quantity > 1) {
      itm.quantity--;
      this.recalculateTotalAmount();
    }
  }
  incrementProductCount(itm) {
    itm.quantity++;
    this.recalculateTotalAmount();
  }
  recalculateTotalAmount() {
    // let newTotalAmount = 0;
    // this.cartItems.forEach( cartItem => {
    //     newTotalAmount += (cartItem.productPrice * cartItem.count)
    // });
    // this.totalAmount = newTotalAmount;
    this.total = this.selectedItems.reduce((a, b) => a + (b.count * b.price), 0);
 
  }
  removeItem(Item) {
    let index = this.selectedItems.indexOf(Item);
    console.log(index);
    console.log(this.selectedItems);
    if (index > -1) {
      this.selectedItems.splice(index, 1);
    }
    console.log(this.selectedItems);
  }

  placeOrder() {
    let obj = JSON.parse(localStorage.getItem('Client'));
    this.client = obj.client ;
    this.token = obj.token ;

    let cartItemsList = JSON.parse(localStorage.getItem('cartItems'));
    this.orderObj.ClientID_FK = this.client.ID;

    this.cartService.checkPromoCode(this.odjpromocode, this.token).subscribe(res => {
      console.log('1:Checking PromoCode...');
      this.promoCodeResult = res.result;
      console.log('2: PromoCode Result...' + res);

      cartItemsList.forEach( obj => {
        let item = {
          Item_Brand: obj.Brand_Name,
          Item_Name: obj.Item_Name,
          Item_Weight: obj.weight,
          quantity: obj.quantity,
          Discount: obj.Discount
        };
        console.log('3: item Discount...' + item.Discount);
        this.orderObj.ItemsDetailsList.push(item);
      });

      console.log('4: order object' + this.orderObj);

      this.cartService.placeOrder(this.orderObj, this.token).subscribe(data => {
      console.log('5: place order return' + data);
      });
    }, (err) => console.log(err)
    );

    localStorage.removeItem('cartItems');
    localStorage.setItem('cartItems', '1');
    this.router.navigate (['/menu']);
}

  }
