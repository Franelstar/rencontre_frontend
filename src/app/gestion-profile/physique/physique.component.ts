import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '@app/services/user.service';
import { User, InfosPersonelle, InfosPhysique } from '@app/model/user.model';
import { Subscription } from 'rxjs';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-physique',
  templateUrl: './physique.component.html',
  styleUrls: ['./physique.component.scss']
})
export class PhysiqueComponent implements OnInit, OnDestroy {

  private readonly notifier: NotifierService;

  signUpForm: FormGroup;
  errorMessage: string;
  userSubscription: Subscription;
  user: User = new User(parseInt(localStorage.getItem('id')),
                        localStorage.getItem('email'),
                        new InfosPersonelle('', '', '', 0, new Date(), '', '', 18, 100),
                        new InfosPhysique('', '', 1, '', '', ''));


  constructor(private formBuilder: FormBuilder,
               private router: Router,
               private userService: UserService,
               private notifierService: NotifierService) {
                this.notifier = notifierService;
                }

  ngOnInit(): void {
    const scrollToTop = window.setInterval(() => {
      const pos: number = window.pageYOffset;
      if (pos > 0) {
          window.scrollTo(0, pos - 20); // how far to scroll on each step
      } else {
          window.clearInterval(scrollToTop);
      }
    }, 16);

    this.initForm();

    this.userService.getUserPhysique().subscribe(
      (data: any) => {
        // Store the access token in the localstorage
        console.log(data);
        if(data[0].continent != null){
          this.signUpForm.get('continent').setValue(data[0].continent);
          this.user.infosPhysique.continent = data[0].continent;
        }
        if(data[0].couleur_peau != null){
          this.signUpForm.get('couleur_peau').setValue(data[0].couleur_peau);
          this.user.infosPhysique.couleur_peau = data[0].couleur_peau;
        }
        if(data[0].taille != null){
          this.signUpForm.get('taille').setValue(data[0].taille);
          this.user.infosPhysique.taille = data[0].taille;
        }
        if(data[0].silhouette != null){
          this.signUpForm.get('silhouette').setValue(data[0].silhouette);
          this.user.infosPhysique.silhouette = data[0].silhouette;
        }
        if(data[0].couleur_yeux != null){
          this.signUpForm.get('couleur_yeux').setValue(data[0].couleur_yeux);
          this.user.infosPhysique.couleur_yeux = data[0].couleur_yeux;
        }
        if(data[0].couleur_cheuveux != null){
          this.signUpForm.get('couleur_cheuveux').setValue(data[0].couleur_cheuveux);
          this.user.infosPhysique.couleur_cheuveux = data[0].couleur_cheuveux;
        }
      }, (err: any) => {
        // This error can be internal or invalid credentials
        // You need to customize this based on the error.status code
        //localStorage.removeItem('access_token');
        //localStorage.removeItem('id');
        //localStorage.removeItem('email');
        //this.router.navigate(['/auth/signin']).then();
      }
    );
  }

  initForm(): void {
    this.signUpForm = this.formBuilder.group({
      continent: [''],
      couleur_peau: [''],
      taille: [''],
      silhouette: [''],
      couleur_yeux: [''],
      couleur_cheuveux: ['']
    });
  }

  onSubmit(): void {
    this.errorMessage = "";

    this.user.infosPhysique.continent = this.signUpForm.get('continent').value;
    this.user.infosPhysique.couleur_peau = this.signUpForm.get('couleur_peau').value;
    this.user.infosPhysique.taille = this.signUpForm.get('taille').value;
    this.user.infosPhysique.silhouette = this.signUpForm.get('silhouette').value;
    this.user.infosPhysique.couleur_yeux = this.signUpForm.get('couleur_yeux').value;
    this.user.infosPhysique.couleur_cheuveux = this.signUpForm.get('couleur_cheuveux').value;

    const formData = new FormData();
    formData.append('continent', this.user.infosPhysique.continent);
    formData.append('couleur_peau', this.user.infosPhysique.couleur_peau );
    formData.append('taille', ''+this.user.infosPhysique.taille);
    formData.append('silhouette', this.user.infosPhysique.silhouette);
    formData.append('couleur_yeux', this.user.infosPhysique.couleur_yeux);
    formData.append('couleur_cheuveux', this.user.infosPhysique.couleur_cheuveux);
    this.userSubscription = this.userService.update_physiques(formData).subscribe(
      (reponse: any) => {
        // Store the access token in the localstorage
        // console.log(res);
        this.notifier.notify("success", reponse);
        this.router.navigate(['/profil']).then();
        const scrollToTop = window.setInterval(() => {
          const pos: number = window.pageYOffset;
          if (pos > 0) {
              window.scrollTo(0, pos - 20); // how far to scroll on each step
          } else {
              window.clearInterval(scrollToTop);
          }
        }, 16);
      }, (err: any) => {
        this.errorMessage = err.error.message;
        this.errorMessage = "Une erreur est survenue, veillez reéssayer !"
      });
  }

  sortir(): void {
    const scrollToTop = window.setInterval(() => {
      const pos: number = window.pageYOffset;
      if (pos > 0) {
          window.scrollTo(0, pos - 20); // how far to scroll on each step
      } else {
          window.clearInterval(scrollToTop);
      }
    }, 16);
    this.router.navigate(['/profil']).then();
  }

  ngOnDestroy(): void {
    if (this.userSubscription != null) {
      this.userSubscription.unsubscribe();
    }
  }
}
