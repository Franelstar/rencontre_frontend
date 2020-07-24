import { Component, OnDestroy, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { UserService } from '@app/services/user.service';
import { User } from '@app/model/user.model';
import {Subscription} from 'rxjs';
import {AuthService} from '@app/services/auth.service';

@Component({
  selector: 'app-index-view',
  templateUrl: './index-view.component.html',
  styleUrls: ['./index-view.component.scss']
})
export class IndexViewComponent implements OnInit, OnDestroy {

  pathVideo: string;
  users: User[];
  isAuth: boolean;
  subscription: Subscription;

  constructor(private authService: AuthService,
              private userService: UserService) { }

  ngOnInit() {
      this.pathVideo = 'http://127.0.0.1/assets/rencontre.mp4';
      this.subscription = this.authService.emitReloadHeader().subscribe(isAuth => {
        this.isAuth = isAuth;
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
