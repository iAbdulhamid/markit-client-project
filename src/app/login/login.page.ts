import { Component, OnInit } from '@angular/core';
import { UserServicesService } from '../Services/user-services.service';
import { User } from '../Shared-Classes-and-Interfaces/user';
import { Observable } from 'rxjs';
import {Router} from "@angular/router"

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  currentUser: User;
  userData = {
    Client_Email: '',
    Client_Password: ''
  };

  constructor(private userServices: UserServicesService,
              private route: Router) { }

  ngOnInit() {
  }

  login() {
    alert(JSON.stringify(this.userData));
    localStorage.setItem('Client_Email', this.userData.Client_Email);

    this.userServices.getUserData(this.userData).subscribe((data) => {
       console.log(data);
       this.currentUser = data;
       localStorage.setItem('Client', JSON.stringify(this.currentUser));
       this.route.navigate(['/menu']);
     }
      , (err) => {
        alert('Incorrect email or password!');
});
  }
}
