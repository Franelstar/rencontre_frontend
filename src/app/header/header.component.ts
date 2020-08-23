import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '@app/services/auth.service';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  isAuth: boolean;
  subscription: Subscription;

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    if (localStorage.getItem('access_token')) {
      this.isAuth = true;
    } else {
      this.isAuth = false;
    }
console.log(this.isAuth)
    this.subscription = this.authService.emitReloadHeader().subscribe(isAuth => {
      this.isAuth = isAuth;
    });
  }

  onSignOut(): void {
    this.authService.signOutUser().subscribe(() => {
      // this.loading = false;
      localStorage.removeItem('access_token');
      localStorage.removeItem('id');
      localStorage.removeItem('email');
      this.router.navigate(['/home']);
      this.isAuth = false;
      console.log(this.isAuth)
    });
  }

}
