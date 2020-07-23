import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { IndexViewComponent } from './index-view/index-view.component';
import {RouterModule, Routes} from '@angular/router';
import {AuthService} from './services/auth.service';
import { FourOhFourComponent } from './four-oh-four/four-oh-four.component';
import {AuthGuard} from './services/auth-guard.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { HeaderComponent } from './header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {ErrorInterceptor} from '@app/_helpers/error-interceptor';
import {JwtInterceptor} from '@app/_helpers/jwt.interceptor';
import {AuthGuardInv} from '@app/services/auth-guard.service.inv';
import {MatRadioModule} from '@angular/material/radio';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';

const appRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: IndexViewComponent },
  { path: 'auth/signin', canActivate: [AuthGuardInv], component: SigninComponent },
  { path: 'auth/signup', canActivate: [AuthGuardInv], component: SignupComponent },
  { path: '', component: IndexViewComponent, pathMatch: 'full' },
  { path: 'not-found', canActivate: [AuthGuard], component: FourOhFourComponent },
  { path: '**', redirectTo: '/not-found' }
];

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    IndexViewComponent,
    FourOhFourComponent,
    SignupComponent,
    SigninComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MDBBootstrapModule.forRoot(),
    MatFormFieldModule,
    MatDatepickerModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    AuthService,
    AuthGuard,
    AuthGuardInv
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }