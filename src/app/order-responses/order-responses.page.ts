import { Component, OnInit } from '@angular/core';
import { UserServicesService } from '../Services/user-services.service';
import { orderResponse } from '../Shared-Classes-and-Interfaces/orderResponse';

@Component({
  selector: 'app-order-responses',
  templateUrl: './order-responses.page.html',
  styleUrls: ['./order-responses.page.scss'],
})
export class OrderResponsesPage implements OnInit {

  token: string;
  orderResponses: orderResponse[] = [];
  responseDetails = [];
  resID: number;
  // public items: any = [];
  orderID = {ID: 113};

  constructor(private userServices: UserServicesService) {
    // this.items = [
    //   { expanded: false }
    // ];
   }

  ngOnInit() {
    let obj = JSON.parse(localStorage.getItem('Client'));
    this.token = obj.token ;
    if (this.token != null) {
      this.userServices.getAllResponses(this.orderID, this.token).subscribe((res) => {
        this.orderResponses = res;
        console.log(res);
      }
      ,
      (err) => {
        console.log('not return data ....');
      });
    }
  }

  getResponseDetails(responseID){
    this.resID = responseID;
    console.log(responseID);
    let obj = JSON.parse(localStorage.getItem('Client'));
    this.token = obj.token ;
    if (this.token != null) {
      this.userServices.getResponseDetails(responseID, this.token).subscribe((res) => {
        this.responseDetails = res;
        console.log(res);
      }
      ,
      (err) => {
        console.log('not return data ....');
      });
    }
  }

  // expandItem(item): void {
  //   if (item.expanded) {
  //     item.expanded = false;
  //   } else {
  //     this.items.map(listItem => {
  //       if (item == listItem) {
  //         listItem.expanded = !listItem.expanded;
  //       } else {
  //         listItem.expanded = false;
  //       }
  //       return listItem; 
  //     });
  //   }  

}