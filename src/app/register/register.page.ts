import { Component, OnInit } from '@angular/core';
import { registeredUser } from '../Shared-Classes-and-Interfaces/registeredUser';
import { UserServicesService } from '../Services/user-services.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registeredUser: registeredUser;
  public items: any = [];

  constructor( private userservice: UserServicesService,
               private router: Router) {
    this.registeredUser =  {
      Client_Name: '',
      Client_Email: '',
      Client_Phone: '',
      Client_UserName: '',
      Client_Password: '',
      ShippingAddressesList: [{
        Zone: '',
        Street: '',
        Building: '',
        FloorNum: '',
        FlatNum: ''
      }]
    };
    this.items = [
      { expanded: false }
    ];
  }
  ngOnInit() {
  }
  register() {
   this.userservice.registerNewUser(this.registeredUser).subscribe(data => {
     console.log(data);
   });
   this.router.navigate(['/menu']);
  }


  expandItem(item): void {
    if (item.expanded) {
      item.expanded = false;
    } else {
      this.items.map(listItem => {
        if (item == listItem) {
          listItem.expanded = !listItem.expanded;
        } else {
          listItem.expanded = false;
        }
        return listItem; 
      });
    }  

}
}

