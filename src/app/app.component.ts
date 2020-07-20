import {Component, OnDestroy, OnInit} from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'rencontre-frontend';

  constructor() {
    var firebaseConfig = {
      apiKey: "AIzaSyDxYQAmm7SQsFjqN8cpGkG7YkRgrlo3ezE",
      authDomain: "rencontre-85b49.firebaseapp.com",
      databaseURL: "https://rencontre-85b49.firebaseio.com",
      projectId: "rencontre-85b49",
      storageBucket: "rencontre-85b49.appspot.com",
      messagingSenderId: "931902665229",
      appId: "1:931902665229:web:fe1879ba6d825e0a191b44",
      measurementId: "G-NYFT4RR5D1"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();
  }
}
