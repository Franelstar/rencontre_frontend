"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.InformationsComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var user_model_1 = require("@app/model/user.model");
var InformationsComponent = /** @class */ (function () {
    function InformationsComponent(formBuilder, authSerice, router, userService, notifierService) {
        this.formBuilder = formBuilder;
        this.authSerice = authSerice;
        this.router = router;
        this.userService = userService;
        this.notifierService = notifierService;
        this.user = new user_model_1.User(parseInt(localStorage.getItem('id')), localStorage.getItem('email'), new user_model_1.InfosPersonelle('', '', '', 0, new Date(), '', '', 18, 100));
        this.minValue = 18;
        this.maxValue = 60;
        this.options = {
            floor: 18,
            ceil: 100,
            draggableRange: true,
            translate: function (value) {
                return value + ' ans';
            }
        };
        this.config = {
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
            showMultipleYearsNavigation: false
        };
        this.notifier = notifierService;
    }
    InformationsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.userService.getUserInfos().subscribe(function (data) {
            // Store the access token in the localstorage
            console.log(data[0]);
            _this.signUpForm.get('nom').setValue(data[0].nom);
            _this.user.infosPersos.nom = data[0].nom;
            _this.signUpForm.get('prenom').setValue(data[0].prenom);
            _this.user.infosPersos.prenom = data[0].prenom;
            if (data[0].sexe != null) {
                _this.signUpForm.get('sexe').setValue(data[0].sexe);
                _this.user.infosPersos.sexe = data[0].sexe;
            }
            if (data[0].o_sexuele != null) {
                _this.signUpForm.get('os').setValue(data[0].o_sexuele);
                _this.user.infosPersos.o_sexuele = data[0].o_sexuele;
            }
            _this.signUpForm.get('dn').setValue(data[0].date_naissance);
            _this.user.infosPersos.date_naissance = data[0].date_naissance;
            _this.signUpForm.get('apropro').setValue(data[0].apropro);
            _this.user.infosPersos.apropro = data[0].apropro;
            if (data[0].sexe_cherche != null) {
                _this.signUpForm.get('sexe_cherche').setValue(data[0].sexe_cherche);
                _this.user.infosPersos.sexe_cherche = data[0].sexe_cherche;
            }
            if (data[0].age_min != null) {
                _this.minValue = data[0].age_min;
                _this.maxValue = data[0].age_max;
                _this.user.infosPersos.age_min = data[0].age_min;
                _this.user.infosPersos.age_max = data[0].age_max;
            }
            _this.user.infosPersos.photo = data[0].photo;
        }, function (err) {
            // This error can be internal or invalid credentials
            // You need to customize this based on the error.status code
            localStorage.removeItem('access_token');
            localStorage.removeItem('id');
            localStorage.removeItem('email');
            _this.router.navigate(['/auth/signin']).then();
        });
        this.initForm();
    };
    InformationsComponent.prototype.initForm = function () {
        this.signUpForm = this.formBuilder.group({
            sexe: ['', [forms_1.Validators.required]],
            nom: ['', [forms_1.Validators.required]],
            prenom: ['', [forms_1.Validators.required]],
            dn: ['', [forms_1.Validators.required]],
            os: ['', [forms_1.Validators.required]],
            image: [''],
            sexe_cherche: ['', [forms_1.Validators.required]],
            apropro: ['', [forms_1.Validators.required]]
        });
    };
    InformationsComponent.prototype.onSubmit = function () {
        var _this = this;
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
        if (typeof (this.file) !== 'undefined' || this.user.infosPersos.photo !== null) {
            var formData = new FormData();
            if (typeof (this.file) !== 'undefined') {
                formData.append('photo', this.file[0].file, this.file[0].file.name);
            }
            formData.append('nom', this.user.infosPersos.nom);
            formData.append('prenom', this.user.infosPersos.prenom);
            formData.append('sexe', this.user.infosPersos.sexe);
            formData.append('o_sexuele', this.signUpForm.get('os').value);
            formData.append('date_naissance', this.signUpForm.get('dn').value);
            formData.append('apropro', this.user.infosPersos.apropro);
            formData.append('sexe_cherche', this.user.infosPersos.sexe_cherche);
            formData.append('age_min', '' + this.minValue);
            this.user.infosPersos.age_max = this.maxValue;
            formData.append('age_max', '' + this.maxValue);
            this.userSubscription = this.userService.update_informations(formData).subscribe(function (reponse) {
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
        }
        else {
            this.errorMessage = "Vous devez charger une photo de profil";
        }
    };
    InformationsComponent.prototype.ngOnDestroy = function () {
        if (this.userSubscription != null) {
            this.userSubscription.unsubscribe();
        }
    };
    InformationsComponent.prototype.sortir = function () {
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
    InformationsComponent = __decorate([
        core_1.Component({
            selector: 'app-informations',
            templateUrl: './informations.component.html',
            styleUrls: ['./informations.component.scss']
        })
    ], InformationsComponent);
    return InformationsComponent;
}());
exports.InformationsComponent = InformationsComponent;
