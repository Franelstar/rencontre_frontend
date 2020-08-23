import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@app/services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  loading = false;
  signInForm: FormGroup;
  errorMessage: string;
  cheminImage = 'assets/img/connexion.jpg';

  constructor(private formBuilder: FormBuilder,
              private authSerice: AuthService,
              private router: Router) {

  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.signInForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      remember: [false]
    });
  }

  onSubmit(): void {
    this.loading = true;
    const email = this.signInForm.get('email').value;
    const password = this.signInForm.get('password').value;
    const remember = this.signInForm.get('remember').value;
    this.authSerice.signInUser(email, password, remember).subscribe(
      (res: any) => {
        // Store the access token in the localstorage
        localStorage.setItem('access_token', res.access_token);
        localStorage.setItem('id', res.user_id);
        localStorage.setItem('email', res.user_email);
        this.router.navigate(['/home']).then();
        this.authSerice.reloadHeader(true);
        this.loading = false;
      }, (err: any) => {
        // This error can be internal or invalid credentials
        // You need to customize this based on the error.status code
        this.errorMessage = 'Email ou Mot de passe incorrect';
        this.loading = false;
      });
  }
}
