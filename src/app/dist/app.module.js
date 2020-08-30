"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var platform_browser_1 = require("@angular/platform-browser");
var core_1 = require("@angular/core");
var app_routing_module_1 = require("./app-routing.module");
var app_component_1 = require("./app.component");
var auth_component_1 = require("./auth/auth.component");
var index_view_component_1 = require("./index-view/index-view.component");
var router_1 = require("@angular/router");
var auth_service_1 = require("./services/auth.service");
var four_oh_four_component_1 = require("./four-oh-four/four-oh-four.component");
var auth_guard_service_1 = require("./services/auth-guard.service");
var http_1 = require("@angular/common/http");
var signup_component_1 = require("./auth/signup/signup.component");
var signin_component_1 = require("./auth/signin/signin.component");
var header_component_1 = require("./header/header.component");
var forms_1 = require("@angular/forms");
var animations_1 = require("@angular/platform-browser/animations");
var toolbar_1 = require("@angular/material/toolbar");
var icon_1 = require("@angular/material/icon");
var button_1 = require("@angular/material/button");
var card_1 = require("@angular/material/card");
var progress_spinner_1 = require("@angular/material/progress-spinner");
var error_interceptor_1 = require("@app/_helpers/error-interceptor");
var jwt_interceptor_1 = require("@app/_helpers/jwt.interceptor");
var auth_guard_service_inv_1 = require("@app/services/auth-guard.service.inv");
var radio_1 = require("@angular/material/radio");
var angular_bootstrap_md_1 = require("angular-bootstrap-md");
var form_field_1 = require("@angular/material/form-field");
var datepicker_1 = require("@angular/material/datepicker");
var gestion_profile_component_1 = require("./gestion-profile/gestion-profile.component");
var informations_component_1 = require("./gestion-profile/informations/informations.component");
var footer_component_1 = require("./footer/footer.component");
var gestion_profile_routing_module_1 = require("./gestion-profile/gestion-profile-routing.module");
var home_component_1 = require("./gestion-profile/home/home.component");
var ng2_date_picker_1 = require("ng2-date-picker");
var ngx_input_file_1 = require("ngx-input-file");
var ng5_slider_1 = require("ng5-slider");
var angular_notifier_1 = require("angular-notifier");
var search_partner_component_1 = require("./gestion-profile/search-partner/search-partner.component");
var physique_component_1 = require("./gestion-profile/physique/physique.component");
var recherche_component_1 = require("./recherche/recherche.component");
var recherche_service_1 = require("@app/services/recherche.service");
var profil_component_1 = require("./recherche/profil/profil.component");
var about_component_1 = require("./about/about.component");
var appRoutes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: index_view_component_1.IndexViewComponent },
    { path: 'auth/signin', canActivate: [auth_guard_service_inv_1.AuthGuardInv], component: signin_component_1.SigninComponent, data: { title: 'Authentification' } },
    { path: 'auth/signup', canActivate: [auth_guard_service_inv_1.AuthGuardInv], component: signup_component_1.SignupComponent },
    { path: 'profil', canActivate: [auth_guard_service_1.AuthGuard], component: gestion_profile_component_1.GestionProfileComponent },
    { path: 'recherche', canActivate: [auth_guard_service_1.AuthGuard], component: recherche_component_1.RechercheComponent },
    { path: 'recherche/:id', canActivate: [auth_guard_service_1.AuthGuard], component: profil_component_1.ProfilComponent },
    { path: 'about', component: about_component_1.AboutComponent },
    { path: '', component: index_view_component_1.IndexViewComponent, pathMatch: 'full' },
    { path: 'not-found', component: four_oh_four_component_1.FourOhFourComponent },
    { path: '**', redirectTo: '/not-found' }
];
var config = {};
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                auth_component_1.AuthComponent,
                index_view_component_1.IndexViewComponent,
                four_oh_four_component_1.FourOhFourComponent,
                signup_component_1.SignupComponent,
                signin_component_1.SigninComponent,
                header_component_1.HeaderComponent,
                gestion_profile_component_1.GestionProfileComponent,
                informations_component_1.InformationsComponent,
                footer_component_1.FooterComponent,
                home_component_1.HomeComponent,
                search_partner_component_1.SearchPartenerComponent,
                physique_component_1.PhysiqueComponent,
                recherche_component_1.RechercheComponent,
                profil_component_1.ProfilComponent,
                about_component_1.AboutComponent
            ],
            imports: [
                platform_browser_1.BrowserModule,
                app_routing_module_1.AppRoutingModule,
                router_1.RouterModule.forRoot(appRoutes),
                gestion_profile_routing_module_1.GestionProfileRoutingModule,
                http_1.HttpClientModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                animations_1.BrowserAnimationsModule,
                toolbar_1.MatToolbarModule,
                icon_1.MatIconModule,
                button_1.MatButtonModule,
                card_1.MatCardModule,
                progress_spinner_1.MatProgressSpinnerModule,
                radio_1.MatRadioModule,
                angular_bootstrap_md_1.MDBBootstrapModule.forRoot(),
                form_field_1.MatFormFieldModule,
                datepicker_1.MatDatepickerModule,
                ng2_date_picker_1.DpDatePickerModule,
                ngx_input_file_1.InputFileModule.forRoot(config),
                ng5_slider_1.Ng5SliderModule,
                angular_notifier_1.NotifierModule.withConfig({
                    position: {
                        horizontal: {
                            position: 'right',
                            distance: 12
                        },
                        vertical: {
                            position: 'bottom',
                            distance: 12
                        }
                    },
                    theme: "material",
                    behaviour: {
                        autoHide: 5000,
                        onClick: false,
                        onMouseover: 'pauseAutoHide',
                        showDismissButton: true,
                        stacking: 5
                    },
                    animations: {
                        enabled: true,
                        show: {
                            preset: 'slide',
                            speed: 800,
                            easing: 'ease-in'
                        },
                        hide: {
                            preset: 'slide',
                            speed: 800,
                            easing: 'ease-out',
                            offset: 50
                        },
                        shift: {
                            speed: 800,
                            easing: 'ease' // All standard CSS easing methods work
                        },
                        overlap: 400
                    }
                })
            ],
            providers: [
                { provide: http_1.HTTP_INTERCEPTORS, useClass: jwt_interceptor_1.JwtInterceptor, multi: true },
                { provide: http_1.HTTP_INTERCEPTORS, useClass: error_interceptor_1.ErrorInterceptor, multi: true },
                auth_service_1.AuthService,
                auth_guard_service_1.AuthGuard,
                auth_guard_service_inv_1.AuthGuardInv,
                recherche_service_1.RechercheService
            ],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
