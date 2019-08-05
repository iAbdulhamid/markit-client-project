import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
// import { StatusBar } from '@ionic-native/status-bar';
// import { SplashScreen } from '@ionic-native/splash-screen';
// import { AngularFireModule } from 'angularfire2';
// import { AngularFirestoreModule } from 'angularfire2/firestore';
// import {NotificationsService} from "src/app/Services/notifications.service";
// import {Firebase} from "@ionic-native/firebase";




import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent} from './header/navbar/navbar.component';
import {RegisterLoginComponent} from './header/register-login/register-login.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
// import { FilterPipe } from './filter.pipe';

// const FIREBASE_CONFIG = {
//   apiKey: 'Paste your current_key here',
//   authDomain: 'Paste your firebase_url here...',
//   databaseURL: 'Paste your firebase_url here...',
//   projectId: 'markit-39310',
//   storageBucket: 'Paste your storage_bucket here...',
//   messagingSenderId: '878628771415'
// };

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    RegisterLoginComponent,
    ],
  entryComponents: [],
  imports: [BrowserModule,
     IonicModule.forRoot(),
      AppRoutingModule,
      HttpClientModule,
      FormsModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
