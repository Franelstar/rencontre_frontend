import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RechercheService } from '@app/services/recherche.service';
import { User, InfosPersonelle, InfosPhysique } from '@app/model/user.model';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {

  private readonly notifier: NotifierService;
  id: number;
  base_url = 'http://localhost/images/';
  user: User = new User(parseInt(localStorage.getItem('id')),
                        localStorage.getItem('email'),
                        new InfosPersonelle('', '', '', 0, new Date(), '', '', 18, 100, 'profile.jpg'),
                        new InfosPhysique('', '', 1, '', '', ''));
  age = 0;
  invite = true;

  constructor(private route: ActivatedRoute,
              private rechercheService: RechercheService,
              private notifierService: NotifierService) { this.notifier = notifierService; }

  ngOnInit(): void {
    this.id = parseInt(this.route.snapshot.paramMap.get('id'));

    this.rechercheService.getuser(this.id).subscribe(
      (data: any) => {
        console.log(data);
        this.user.infosPersos.nom = data[0].information_personnelles.nom;
        this.user.infosPersos.prenom = data[0].information_personnelles.prenom;
        this.user.infosPersos.sexe = data[0].information_personnelles.sexe;
        this.user.infosPersos.o_sexuele = data[0].information_personnelles.o_sexuele;
        this.user.infosPersos.date_naissance = data[0].information_personnelles.date_naissance;
        this.user.infosPersos.apropro = data[0].information_personnelles.apropro;
        this.user.infosPersos.sexe_cherche = data[0].information_personnelles.sexe_cherche;
        this.user.infosPersos.age_min = data[0].information_personnelles.age_min;
        this.user.infosPersos.age_max = data[0].information_personnelles.age_max;
        this.user.infosPersos.photo = data[0].information_personnelles.photo;
        this.age = data[0].age;
        this.user.infosPhysique.continent = data[0].information_physique.continent;
        this.user.infosPhysique.couleur_peau = data[0].information_physique.couleur_peau;
        this.user.infosPhysique.taille = data[0].information_physique.taille;
        this.user.infosPhysique.silhouette = data[0].information_physique.silhouette;
        this.user.infosPhysique.couleur_yeux = data[0].information_physique.couleur_yeux;
        this.user.infosPhysique.couleur_cheuveux = data[0].information_physique.couleur_cheuveux;
      }
    );
  }

  annulerInvitation(): void {
    this.notifier.notify("success", "Invitation annulée avec succès");
    this.invite = true;
  }

  inviter(): void {
    this.notifier.notify("success", "Invitation envoyée avec succès");
    this.invite = false;
  }

}
