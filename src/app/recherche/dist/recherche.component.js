"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.RechercheComponent = void 0;
var core_1 = require("@angular/core");
var user_model_1 = require("@app/model/user.model");
var RechercheComponent = /** @class */ (function () {
    function RechercheComponent(rechercheService, userService) {
        this.rechercheService = rechercheService;
        this.userService = userService;
        this.users = [];
        this.base_url = 'http://localhost/images/';
        this.user = new user_model_1.User(parseInt(localStorage.getItem('id')), localStorage.getItem('email'), new user_model_1.InfosPersonelle('', '', '', 0, new Date(), '', '', 18, 100));
        this.loader = false;
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
    }
    RechercheComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.userService.getUserInfos().subscribe(function (data) {
            _this.user.infosPersos.nom = data[0].nom;
            _this.user.infosPersos.prenom = data[0].prenom;
            _this.user.infosPersos.sexe = data[0].sexe;
            _this.user.infosPersos.o_sexuele = data[0].o_sexuele;
            _this.user.infosPersos.date_naissance = data[0].date_naissance;
            _this.user.infosPersos.apropro = data[0].apropro;
            _this.user.infosPersos.sexe_cherche = data[0].sexe_cherche;
            if (data[0].age_min != null) {
                _this.minValue = data[0].age_min;
                _this.maxValue = data[0].age_max;
                _this.user.infosPersos.age_min = data[0].age_min;
                _this.user.infosPersos.age_max = data[0].age_max;
            }
            _this.user.infosPersos.photo = data[0].photo;
        });
        var formData = new FormData();
        this.userSubscription = this.rechercheService.getusers(formData).subscribe(function (data) {
            console.log(data);
            for (var index = 0; index < data.length; index++) {
                _this.users.push(data[index]);
            }
        });
    };
    RechercheComponent.prototype.chercher = function () {
        var _this = this;
        this.users = [];
        this.loader = true;
        var formData = new FormData();
        formData.append('recherche', 'true');
        formData.append('age_min', '' + this.minValue);
        formData.append('age_max', '' + this.maxValue);
        this.rechercheService.getusers(formData).subscribe(function (data) {
            _this.loader = false;
            for (var index = 0; index < data.length; index++) {
                _this.users.push(data[index]);
            }
        });
    };
    RechercheComponent = __decorate([
        core_1.Component({
            selector: 'app-recherche',
            templateUrl: './recherche.component.html',
            styleUrls: ['./recherche.component.scss']
        })
    ], RechercheComponent);
    return RechercheComponent;
}());
exports.RechercheComponent = RechercheComponent;
