import { Component, OnInit } from '@angular/core';
import { User } from '../Shared-Classes-and-Interfaces/user';
import { UserServicesService } from '../Services/user-services.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.page.html',
  styleUrls: ['./myprofile.page.scss'],
})
export class MyprofilePage implements OnInit {

  client: any;
  isProfileChanged = false;
  isEnableSave = false;
  updatedUser =  {
    Client_ID: '',
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

  constructor(private userService: UserServicesService,
    private router: Router
    ) { }

  ngOnInit() {
    let obj = JSON.parse(localStorage.getItem('Client'));
    this.client = obj.client ;
    console.log(this.client);
  }

  update() {
    let obj = JSON.parse(localStorage.getItem('Client'));
    this.client.Client_ID = obj.client.Client_ID;
    this.userService.updateUser(this.client).subscribe(data => {
      console.log(data);
    });
    this.router.navigate(['/menu']);
   }

  profileChanged() {
    console.log('profileChanged');
    this.isProfileChanged = true;
  }
  enableSave() {
    this.isEnableSave = true;
  }

}
