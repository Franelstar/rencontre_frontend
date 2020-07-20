import { Component, OnDestroy, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { UserService } from '@app/services/user.service';
import { User } from '@app/model/user.model';

@Component({
  selector: 'app-index-view',
  templateUrl: './index-view.component.html',
  styleUrls: ['./index-view.component.scss']
})
export class IndexViewComponent implements OnInit {

  loading = false;
  users: User[];

  constructor(private userService: UserService) { }

  ngOnInit() {
      this.loading = true;
      /*this.userService.getAll().pipe(first()).subscribe(users => {
          this.loading = false;
          this.users = users;
      });*/
  }
}
