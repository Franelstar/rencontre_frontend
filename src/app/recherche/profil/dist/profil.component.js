"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ProfilComponent = void 0;
var core_1 = require("@angular/core");
var user_model_1 = require("@app/model/user.model");
var ProfilComponent = /** @class */ (function () {
    function ProfilComponent(route, rechercheService, notifierService) {
        this.route = route;
        this.rechercheService = rechercheService;
        this.notifierService = notifierService;
        this.base_url = 'http://localhost/images/';
        this.user = new user_model_1.User(parseInt(localStorage.getItem('id')), localStorage.getItem('email'), new user_model_1.InfosPersonelle('', '', '', 0, new Date(), '', '', 18, 100, 'profile.jpg'), new user_model_1.InfosPhysique('', '', 1, '', '', ''));
        this.age = 0;
        this.invite = true;
        this.notifier = notifierService;
    }
    ProfilComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.id = parseInt(this.route.snapshot.paramMap.get('id'));
        this.rechercheService.getuser(this.id).subscribe(function (data) {
            console.log(data);
            _this.user.infosPersos.nom = data[0].information_personnelles.nom;
            _this.user.infosPersos.prenom = data[0].information_personnelles.prenom;
            _this.user.infosPersos.sexe = data[0].information_personnelles.sexe;
            _this.user.infosPersos.o_sexuele = data[0].information_personnelles.o_sexuele;
            _this.user.infosPersos.date_naissance = data[0].information_personnelles.date_naissance;
            _this.user.infosPersos.apropro = data[0].information_personnelles.apropro;
            _this.user.infosPersos.sexe_cherche = data[0].information_personnelles.sexe_cherche;
            _this.user.infosPersos.age_min = data[0].information_personnelles.age_min;
            _this.user.infosPersos.age_max = data[0].information_personnelles.age_max;
            _this.user.infosPersos.photo = data[0].information_personnelles.photo;
            _this.age = data[0].age;
            _this.user.infosPhysique.continent = data[0].information_physique.continent;
            _this.user.infosPhysique.couleur_peau = data[0].information_physique.couleur_peau;
            _this.user.infosPhysique.taille = data[0].information_physique.taille;
            _this.user.infosPhysique.silhouette = data[0].information_physique.silhouette;
            _this.user.infosPhysique.couleur_yeux = data[0].information_physique.couleur_yeux;
            _this.user.infosPhysique.couleur_cheuveux = data[0].information_physique.couleur_cheuveux;
        });
    };
    ProfilComponent.prototype.annulerInvitation = function () {
        this.notifier.notify("success", "Invitation annulée avec succès");
        this.invite = true;
    };
    ProfilComponent.prototype.inviter = function () {
        this.notifier.notify("success", "Invitation envoyée avec succès");
        this.invite = false;
    };
    ProfilComponent = __decorate([
        core_1.Component({
            selector: 'app-profil',
            templateUrl: './profil.component.html',
            styleUrls: ['./profil.component.scss']
        })
    ], ProfilComponent);
    return ProfilComponent;
}());
exports.ProfilComponent = ProfilComponent;
