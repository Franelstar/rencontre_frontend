import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import {AuthService} from '@app/services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isAuth: boolean;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    console.log(localStorage.getItem('access_token'));
    if (localStorage.getItem('access_token')) {
      this.isAuth = true;
    } else {
      this.isAuth = false;
    }
  }

  onSignOut(){
    this.authService.signOutUser().subscribe(() => {
      //this.loading = false;
      localStorage.removeItem('access_token');
      this.router.navigate(['/home']);
    });
  }

}
