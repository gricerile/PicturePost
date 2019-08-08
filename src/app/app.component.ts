import { Component } from '@angular/core';
import * as firebase from 'firebase/app';
import { Platform } from '@ionic/angular';
import { Plugins } from '@capacitor/core';

const { SplashScreen, StatusBar } = Plugins;

const firebaseConfig = {
  apiKey: "AIzaSyC7vuQ2v4CD6WERusyP3Af-LFpTt6nZcuA",
  authDomain: "ionicpicturepostserver.firebaseapp.com",
  databaseURL: "https://ionicpicturepostserver.firebaseio.com",
  projectId: "ionicpicturepostserver",
  storageBucket: "ionicpicturepostserver.appspot.com",
  messagingSenderId: "899762254782",
  appId: "1:899762254782:web:23dc96a1c53cb66d"
};

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
  ) {
    this.initializeApp();
    firebase.initializeApp(firebaseConfig);
  }

  initializeApp() {
    SplashScreen.hide().catch(error => {
      console.error(error);
    });

    StatusBar.hide().catch(error => {
      console.error(error);
    });
  }
}
