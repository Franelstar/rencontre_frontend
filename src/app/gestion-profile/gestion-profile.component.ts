import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {AuthService} from '@app/services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-gestion-profile',
  templateUrl: './gestion-profile.component.html',
  styleUrls: ['./gestion-profile.component.scss']
})
export class GestionProfileComponent implements OnInit {

  signUpForm: FormGroup;
  errorMessage: string;
  userSubscription: Subscription;

  constructor(private formBuilder: FormBuilder,
              private authSerice: AuthService,
              private router: Router) {

  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.signUpForm = this.formBuilder.group({
      jecherche: ['', [Validators.required]],
      jesuis: ['', [Validators.required]],
      nom: ['', [Validators.required]],
      prenom: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      password_confirm: ['', [Validators.required, Validators.minLength(8)]],
      acceptTerms: [false, Validators.requiredTrue]
    }, {
      validator: this.MustMatch('password', 'password_confirm')
    });
  }

  MustMatch(controlName: string, matchingControlName: string): (formGroup: FormGroup) => any {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        // return if another validator has already found an error on the matchingControl
        return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({mustMatch: true});
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  onSubmit(): void {
    const jesuis = this.signUpForm.get('jesuis').value;
    const jecherche = this.signUpForm.get('jecherche').value;
    const nom = this.signUpForm.get('nom').value;
    const prenom = this.signUpForm.get('prenom').value;
    const email = this.signUpForm.get('email').value;
    const password = this.signUpForm.get('password').value;
    const password_confirm = this.signUpForm.get('password_confirm').value;

    this.userSubscription = this.authSerice.createNewUser(nom, email, password, password_confirm).subscribe(
      () => {
        // Store the access token in the localstorage
        // console.log(res);
        this.router.navigate(['/signin']).then();
      }, (err: any) => {
        // This error can be internal or invalid credentials
        // You need to customize this based on the error.status code
        this.errorMessage = err.error.message;
        if (typeof err.error.errors !== 'undefined' && typeof err.error.errors === 'object') {
          if (typeof err.error.errors.nom !== 'undefined') {
            this.errorMessage = err.error.errors.nom[0];
          } else if (typeof err.error.errors.prenom !== 'undefined') {
            this.errorMessage = err.error.errors.prenom[0];
          } else if (typeof err.error.errors.sexe !== 'undefined') {
            this.errorMessage = err.error.errors.sexe[0];
          } else if (typeof err.error.errors.email !== 'undefined') {
            this.errorMessage = err.error.errors.email[0];
          } else if (typeof err.error.errors.password !== 'undefined') {
            this.errorMessage = err.error.errors.password[0];
          }
        }
      });
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

}
