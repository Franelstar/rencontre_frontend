import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '@app/services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signUpForm: FormGroup;
  errorMessage: string;

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
      password: ['', [Validators.required, Validators.minLength(6)]],
      password_confirm: ['', [Validators.required, Validators.minLength(6)]],
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
    console.log(jesuis);
    const email = this.signUpForm.get('email').value;
    const password = this.signUpForm.get('password').value;
/*
    this.authSerice.createNewUser(email, password).then(
      () => {
        this.router.navigate(['/home']);
      },
      (error) => {
        this.errorMessage = error;
      }
    );*/
  }
}

