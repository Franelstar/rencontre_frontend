import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '@app/services/auth.service';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, OnDestroy {

  signUpForm: FormGroup;
  errorMessage: string;
  userSubscription: Subscription;
  loading: boolean;
  cheminImage = 'assets/img/register.jpg';

  constructor(private formBuilder: FormBuilder,
              private authSerice: AuthService,
              private router: Router) {

  }

  ngOnInit(): void {
    this.initForm();
    this.loading = false;
  }

  initForm(): void {
    this.signUpForm = this.formBuilder.group({
      name: ['', [Validators.required]],
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
    this.loading = true;
    const name = this.signUpForm.get('name').value;
    const email = this.signUpForm.get('email').value;
    const password = this.signUpForm.get('password').value;
    const password_confirm = this.signUpForm.get('password_confirm').value;

    this.userSubscription = this.authSerice.createNewUser(name, email, password, password_confirm).subscribe(
      () => {
        // Store the access token in the localstorage
        // console.log(res);
        this.router.navigate(['/auth/signin']).then();
      }, (err: any) => {
        // This error can be internal or invalid credentials
        // You need to customize this based on the error.status code
        this.errorMessage = err.error.message;
        if (typeof err.error.errors !== 'undefined' && typeof err.error.errors === 'object') {
          if (typeof err.error.errors.name !== 'undefined') {
            this.errorMessage = err.error.errors.name[0];
          } else if (typeof err.error.errors.email !== 'undefined') {
            this.errorMessage = err.error.errors.email[0];
          } else if (typeof err.error.errors.password !== 'undefined') {
            this.errorMessage = err.error.errors.password[0];
          }
        }
        this.loading = false;
      });
  }

  ngOnDestroy(): void {
    if (this.userSubscription != null) {
      this.userSubscription.unsubscribe();
    }
  }
}
