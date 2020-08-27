"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PhysiqueComponent = void 0;
var core_1 = require("@angular/core");
var user_model_1 = require("@app/model/user.model");
var PhysiqueComponent = /** @class */ (function () {
    function PhysiqueComponent(formBuilder, router, userService, notifierService) {
        this.formBuilder = formBuilder;
        this.router = router;
        this.userService = userService;
        this.notifierService = notifierService;
        this.user = new user_model_1.User(parseInt(localStorage.getItem('id')), localStorage.getItem('email'), new user_model_1.InfosPersonelle('', '', '', 0, new Date(), '', '', 18, 100), new user_model_1.InfosPhysique('', '', 1, '', '', ''));
        this.notifier = notifierService;
    }
    PhysiqueComponent.prototype.ngOnInit = function () {
        var _this = this;
        var scrollToTop = window.setInterval(function () {
            var pos = window.pageYOffset;
            if (pos > 0) {
                window.scrollTo(0, pos - 20); // how far to scroll on each step
            }
            else {
                window.clearInterval(scrollToTop);
            }
        }, 16);
        this.initForm();
        this.userService.getUserPhysique().subscribe(function (data) {
            // Store the access token in the localstorage
            console.log(data);
            if (data[0].continent != null) {
                _this.signUpForm.get('continent').setValue(data[0].continent);
                _this.user.infosPhysique.continent = data[0].continent;
            }
            if (data[0].couleur_peau != null) {
                _this.signUpForm.get('couleur_peau').setValue(data[0].couleur_peau);
                _this.user.infosPhysique.couleur_peau = data[0].couleur_peau;
            }
            if (data[0].taille != null) {
                _this.signUpForm.get('taille').setValue(data[0].taille);
                _this.user.infosPhysique.taille = data[0].taille;
            }
            if (data[0].silhouette != null) {
                _this.signUpForm.get('silhouette').setValue(data[0].silhouette);
                _this.user.infosPhysique.silhouette = data[0].silhouette;
            }
            if (data[0].couleur_yeux != null) {
                _this.signUpForm.get('couleur_yeux').setValue(data[0].couleur_yeux);
                _this.user.infosPhysique.couleur_yeux = data[0].couleur_yeux;
            }
            if (data[0].couleur_cheuveux != null) {
                _this.signUpForm.get('couleur_cheuveux').setValue(data[0].couleur_cheuveux);
                _this.user.infosPhysique.couleur_cheuveux = data[0].couleur_cheuveux;
            }
        }, function (err) {
            // This error can be internal or invalid credentials
            // You need to customize this based on the error.status code
            //localStorage.removeItem('access_token');
            //localStorage.removeItem('id');
            //localStorage.removeItem('email');
            //this.router.navigate(['/auth/signin']).then();
        });
    };
    PhysiqueComponent.prototype.initForm = function () {
        this.signUpForm = this.formBuilder.group({
            continent: [''],
            couleur_peau: [''],
            taille: [''],
            silhouette: [''],
            couleur_yeux: [''],
            couleur_cheuveux: ['']
        });
    };
    PhysiqueComponent.prototype.onSubmit = function () {
        var _this = this;
        this.errorMessage = "";
        this.user.infosPhysique.continent = this.signUpForm.get('continent').value;
        this.user.infosPhysique.couleur_peau = this.signUpForm.get('couleur_peau').value;
        this.user.infosPhysique.taille = this.signUpForm.get('taille').value;
        this.user.infosPhysique.silhouette = this.signUpForm.get('silhouette').value;
        this.user.infosPhysique.couleur_yeux = this.signUpForm.get('couleur_yeux').value;
        this.user.infosPhysique.couleur_cheuveux = this.signUpForm.get('couleur_cheuveux').value;
        var formData = new FormData();
        formData.append('continent', this.user.infosPhysique.continent);
        formData.append('couleur_peau', this.user.infosPhysique.couleur_peau);
        formData.append('taille', '' + this.user.infosPhysique.taille);
        formData.append('silhouette', this.user.infosPhysique.silhouette);
        formData.append('couleur_yeux', this.user.infosPhysique.couleur_yeux);
        formData.append('couleur_cheuveux', this.user.infosPhysique.couleur_cheuveux);
        this.userSubscription = this.userService.update_physiques(formData).subscribe(function (reponse) {
            // Store the access token in the localstorage
            // console.log(res);
            _this.notifier.notify("success", reponse);
            _this.router.navigate(['/profil']).then();
            var scrollToTop = window.setInterval(function () {
                var pos = window.pageYOffset;
                if (pos > 0) {
                    window.scrollTo(0, pos - 20); // how far to scroll on each step
                }
                else {
                    window.clearInterval(scrollToTop);
                }
            }, 16);
        }, function (err) {
            _this.errorMessage = err.error.message;
            _this.errorMessage = "Une erreur est survenue, veillez reéssayer !";
        });
    };
    PhysiqueComponent.prototype.sortir = function () {
        var scrollToTop = window.setInterval(function () {
            var pos = window.pageYOffset;
            if (pos > 0) {
                window.scrollTo(0, pos - 20); // how far to scroll on each step
            }
            else {
                window.clearInterval(scrollToTop);
            }
        }, 16);
        this.router.navigate(['/profil']).then();
    };
    PhysiqueComponent.prototype.ngOnDestroy = function () {
        if (this.userSubscription != null) {
            this.userSubscription.unsubscribe();
        }
    };
    PhysiqueComponent = __decorate([
        core_1.Component({
            selector: 'app-physique',
            templateUrl: './physique.component.html',
            styleUrls: ['./physique.component.scss']
        })
    ], PhysiqueComponent);
    return PhysiqueComponent;
}());
exports.PhysiqueComponent = PhysiqueComponent;
