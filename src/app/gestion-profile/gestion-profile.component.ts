import { Component, OnInit, NgModule } from '@angular/core';
import { User, InfosPersonelle } from '@app/model/user.model';
import { UserService } from '@app/services/user.service';

@Component({
  selector: 'app-gestion-profile',
  templateUrl: './gestion-profile.component.html',
  styleUrls: ['./gestion-profile.component.scss']
})

export class GestionProfileComponent implements OnInit {

  base_url = 'http://localhost/images/';
  url_image = 'profile.jpg';
  user: User = new User(parseInt(localStorage.getItem('id')), localStorage.getItem('email'), new InfosPersonelle('', '', '', 0, new Date(), '', '', 18, 100));

  constructor(private userService: UserService) {

  }

  ngOnInit(): void {
    this.userService.getUserInfos().subscribe(
      (data: any) => {
        this.user.infosPersos.nom = data[0].nom;
        this.user.infosPersos.prenom = data[0].prenom;
        this.user.infosPersos.sexe = data[0].sexe;
        this.user.infosPersos.o_sexuele = data[0].o_sexuele;
        this.user.infosPersos.date_naissance = data[0].date_naissance;
        this.user.infosPersos.apropro = data[0].apropro;
        this.user.infosPersos.sexe_cherche = data[0].sexe_cherche;
        this.user.infosPersos.age_min = data[0].age_min;
        this.user.infosPersos.age_max = data[0].age_max;
        this.user.infosPersos.photo = data[0].photo;
        this.url_image = data[0].photo;
      }, (err: any) => {
        // This error can be internal or invalid credentials
        // You need to customize this based on the error.status code
        localStorage.removeItem('access_token');
        localStorage.removeItem('id');
        localStorage.removeItem('email');
      }
    );
  }

}
