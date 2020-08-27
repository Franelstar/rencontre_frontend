"use strict";
exports.__esModule = true;
exports.InfosPhysique = exports.InfosPersonelle = exports.User = void 0;
var User = /** @class */ (function () {
    function User(id, email, infosPersos, infosPhysique) {
        this.id = id;
        this.email = email;
        this.infosPersos = infosPersos;
        this.infosPhysique = infosPhysique;
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
var InfosPhysique = /** @class */ (function () {
    function InfosPhysique(continent, couleur_peau, taille, silhouette, couleur_yeux, couleur_cheuveux) {
        this.continent = continent;
        this.couleur_peau = couleur_peau;
        this.taille = taille;
        this.silhouette = silhouette;
        this.couleur_yeux = couleur_yeux;
        this.couleur_cheuveux = couleur_cheuveux;
    }
    return InfosPhysique;
}());
exports.InfosPhysique = InfosPhysique;
