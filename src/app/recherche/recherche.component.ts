import { Component, OnInit } from '@angular/core';
import { RechercheService } from '@app/services/recherche.service';
import { Subscription } from 'rxjs';
import { Options } from 'ng5-slider';
import { UserService } from '@app/services/user.service';
import { User, InfosPersonelle } from '@app/model/user.model';

@Component({
  selector: 'app-recherche',
  templateUrl: './recherche.component.html',
  styleUrls: ['./recherche.component.scss']
})
export class RechercheComponent implements OnInit {

  userSubscription: Subscription;
  users = [];
  base_url = 'http://localhost/images/';
  user: User = new User(parseInt(localStorage.getItem('id')), localStorage.getItem('email'), new InfosPersonelle('', '', '', 0, new Date(), '', '', 18, 100));

  loader = false;

  minValue: number = 18;
  maxValue: number = 60;
  options: Options = {
    floor: 18,
    ceil: 100,
    draggableRange: true,
    translate: (value: number): string => {
      return value + ' ans';
    }
  };

  constructor(private rechercheService: RechercheService,
             private userService: UserService) { }

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
        if(data[0].age_min != null){
          this.minValue = data[0].age_min;
          this.maxValue = data[0].age_max;
          this.user.infosPersos.age_min = data[0].age_min;
          this.user.infosPersos.age_max = data[0].age_max;
        }
        this.user.infosPersos.photo = data[0].photo;
      }
    );

    const formData = new FormData();
    this.userSubscription = this.rechercheService.getusers(formData).subscribe(
      (data: any) => {
        console.log(data);
        for (let index = 0; index < data.length; index++){
          this.users.push(data[index]);
        }
      }
    );
  }

  chercher(): void {
    this.users = [];
    this.loader = true;
    const formData = new FormData();
    formData.append('recherche', 'true');
    formData.append('age_min', ''+this.minValue);
    formData.append('age_max', ''+this.maxValue);

    this.rechercheService.getusers(formData).subscribe(
      (data: any) => {
        this.loader = false;
        for (let index = 0; index < data.length; index++){
          this.users.push(data[index]);
        }
      }
    );
  }

}
