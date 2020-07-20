import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@app/services/auth.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  submitted = false;
  loading = false;
  signInForm: FormGroup;
  errorMessage: string;

  constructor(private formBuilder: FormBuilder,
              private authSerice: AuthService,
              private router: Router) {

  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.signInForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{1,}/)]]
    });
  }

  onSubmit() {
    this.submitted = true;
    this.loading = true;
    const email = this.signInForm.get('email').value;
    const password = this.signInForm.get('password').value;
    this.authSerice.signInUser(email, password).subscribe(
      (res: any) => {
        // Store the access token in the localstorage
        localStorage.setItem('access_token', res.access_token);
        this.router.navigate(['/home']);
        location.reload();
        //this.loading = false;
        // Navigate to home page
        //this.router.navigate(['/home']);
      }, (err: any) => {
        // This error can be internal or invalid credentials
        // You need to customize this based on the error.status code
        this.errorMessage = err;
        this.loading = false;
      });
  }
}
