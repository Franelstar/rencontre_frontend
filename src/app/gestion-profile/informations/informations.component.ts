import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {AuthService} from '@app/services/auth.service';
import {Router} from '@angular/router';
import { Options } from 'ng5-slider';
import { UserService } from '@app/services/user.service';
import { User, InfosPersonelle } from '@app/model/user.model';
import { NotifierService } from "angular-notifier";

@Component({
  selector: 'app-informations',
  templateUrl: './informations.component.html',
  styleUrls: ['./informations.component.scss']
})
export class InformationsComponent implements OnInit {

  private readonly notifier: NotifierService;

  signUpForm: FormGroup;
  errorMessage: string;
  userSubscription: Subscription;
  file: File;
  user: User = new User(parseInt(localStorage.getItem('id')), localStorage.getItem('email'), new InfosPersonelle('', '', '', 0, new Date(), '', '', 18, 100));

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

  config = {
    allowMultiSelect: false,
    closeOnSelect: undefined,
    closeOnSelectDelay: 100,
    onOpenDelay: 10,
    appendTo: document.body,
    drops: 'down',
    opens: 'right',
    enableMonthSelector: true,
    format: "YYYY-MM-DD",
    yearFormat: 'YYYY',
    showGoToCurrent: true,
    timeSeparator: ':',
    showMultipleYearsNavigation: false,
    // min:'2017-08-29 15:50',
    // minTime:'2017-08-29 15:50'
  };

  constructor(private formBuilder: FormBuilder,
              private authSerice: AuthService,
              private router: Router,
              private userService: UserService,
              private notifierService: NotifierService) {

                this.notifier = notifierService;
  }

  ngOnInit(): void {

    this.userService.getUserInfos().subscribe(
      (data: any) => {
        // Store the access token in the localstorage
        console.log(data[0]);
        this.signUpForm.get('nom').setValue(data[0].nom);
        this.user.infosPersos.nom = data[0].nom;
        this.signUpForm.get('prenom').setValue(data[0].prenom);
        this.user.infosPersos.prenom = data[0].prenom;
        if(data[0].sexe != null){
          this.signUpForm.get('sexe').setValue(data[0].sexe);
          this.user.infosPersos.sexe = data[0].sexe;
        }
        if(data[0].o_sexuele != null){
          this.signUpForm.get('os').setValue(data[0].o_sexuele);
          this.user.infosPersos.o_sexuele = data[0].o_sexuele;
        }
        this.signUpForm.get('dn').setValue(data[0].date_naissance);
        this.user.infosPersos.date_naissance = data[0].date_naissance;
        this.signUpForm.get('apropro').setValue(data[0].apropro);
        this.user.infosPersos.apropro = data[0].apropro;
        if(data[0].sexe_cherche != null){
          this.signUpForm.get('sexe_cherche').setValue(data[0].sexe_cherche);
          this.user.infosPersos.sexe_cherche = data[0].sexe_cherche;
        }
        if(data[0].age_min != null){
          this.minValue = data[0].age_min;
          this.maxValue = data[0].age_max;
        }
        this.user.infosPersos.photo = data[0].photo;
      }, (err: any) => {
        // This error can be internal or invalid credentials
        // You need to customize this based on the error.status code
        localStorage.removeItem('access_token');
        localStorage.removeItem('id');
        localStorage.removeItem('email');
        this.router.navigate(['/auth/signin']).then();
      }
    );

    this.initForm();
  }

  initForm(): void {
    this.signUpForm = this.formBuilder.group({
      sexe: ['', [Validators.required]],
      nom: ['', [Validators.required]],
      prenom: ['', [Validators.required]],
      dn: ['', [Validators.required]],
      os: ['', [Validators.required]],
      image: [''],
      sexe_cherche: ['', [Validators.required]],
      apropro: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    this.errorMessage = "";

    this.user.infosPersos.nom = this.signUpForm.get('nom').value;
    this.user.infosPersos.prenom = this.signUpForm.get('prenom').value;
    this.user.infosPersos.sexe = this.signUpForm.get('sexe').value;
    this.user.infosPersos.o_sexuele = this.signUpForm.get('os').value;
    this.user.infosPersos.date_naissance = this.signUpForm.get('dn').value;
    this.user.infosPersos.apropro = this.signUpForm.get('apropro').value;
    this.user.infosPersos.sexe_cherche = this.signUpForm.get('sexe_cherche').value;
    this.user.infosPersos.age_min = this.minValue;
    this.user.infosPersos.age_max = this.maxValue;

    if (typeof(this.file) !== 'undefined' || this.user.infosPersos.photo !== null){
      const formData = new FormData();
      if (typeof(this.file) !== 'undefined'){
        formData.append('photo', this.file[0].file, this.file[0].file.name);
      }

      formData.append('nom', this.user.infosPersos.nom);
      formData.append('prenom', this.user.infosPersos.prenom );
      formData.append('sexe', this.user.infosPersos.sexe);
      formData.append('o_sexuele', this.signUpForm.get('os').value);
      formData.append('date_naissance', this.signUpForm.get('dn').value);
      formData.append('apropro', this.user.infosPersos.apropro);
      formData.append('sexe_cherche',  this.user.infosPersos.sexe_cherche);
      formData.append('age_min', ''+this.minValue);
      this.user.infosPersos.age_max = this.maxValue;
      formData.append('age_max', ''+this.maxValue);
      this.userSubscription = this.userService.update_informations(formData).subscribe(
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
    } else {
      this.errorMessage = "Vous devez charger une photo de profil";
    }
  }

  ngOnDestroy(): void {
    if (this.userSubscription != null) {
      this.userSubscription.unsubscribe();
    }
  }

}
