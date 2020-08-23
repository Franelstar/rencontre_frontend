"use strict";
exports.__esModule = true;
exports.InfosPersonelle = exports.User = void 0;
var User = /** @class */ (function () {
    function User(id, email, infosPersos) {
        this.id = id;
        this.email = email;
        this.infosPersos = infosPersos;
    }
    return User;
}());
exports.User = User;
var InfosPersonelle = /** @class */ (function () {
    function InfosPersonelle(nom, prenom, sexe, o_sexuele, date_naissance, apropro, sexe_cherche, age_min, age_max, photo) {
        this.nom = nom;
        this.prenom = prenom;
        this.sexe = sexe;
        this.o_sexuele = o_sexuele;
        this.date_naissance = date_naissance;
        this.apropro = apropro;
        this.sexe_cherche = sexe_cherche;
        this.age_min = age_min;
        this.age_max = age_max;
        this.photo = photo;
    }
    return InfosPersonelle;
}());
exports.InfosPersonelle = InfosPersonelle;
