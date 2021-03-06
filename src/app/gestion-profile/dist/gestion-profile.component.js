"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.GestionProfileComponent = void 0;
var core_1 = require("@angular/core");
var user_model_1 = require("@app/model/user.model");
var GestionProfileComponent = /** @class */ (function () {
    function GestionProfileComponent(userService) {
        this.userService = userService;
        this.base_url = 'http://localhost/images/';
        this.url_image = 'profile.jpg';
        this.user = new user_model_1.User(parseInt(localStorage.getItem('id')), localStorage.getItem('email'), new user_model_1.InfosPersonelle('', '', '', 0, new Date(), '', '', 18, 100));
    }
    GestionProfileComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.userService.getUserInfos().subscribe(function (data) {
            _this.user.infosPersos.nom = data[0].nom;
            _this.user.infosPersos.prenom = data[0].prenom;
            _this.user.infosPersos.sexe = data[0].sexe;
            _this.user.infosPersos.o_sexuele = data[0].o_sexuele;
            _this.user.infosPersos.date_naissance = data[0].date_naissance;
            _this.user.infosPersos.apropro = data[0].apropro;
            _this.user.infosPersos.sexe_cherche = data[0].sexe_cherche;
            _this.user.infosPersos.age_min = data[0].age_min;
            _this.user.infosPersos.age_max = data[0].age_max;
            _this.user.infosPersos.photo = data[0].photo;
            _this.url_image = data[0].photo;
        }, function (err) {
            // This error can be internal or invalid credentials
            // You need to customize this based on the error.status code
            localStorage.removeItem('access_token');
            localStorage.removeItem('id');
            localStorage.removeItem('email');
        });
    };
    GestionProfileComponent = __decorate([
        core_1.Component({
            selector: 'app-gestion-profile',
            templateUrl: './gestion-profile.component.html',
            styleUrls: ['./gestion-profile.component.scss']
        })
    ], GestionProfileComponent);
    return GestionProfileComponent;
}());
exports.GestionProfileComponent = GestionProfileComponent;
