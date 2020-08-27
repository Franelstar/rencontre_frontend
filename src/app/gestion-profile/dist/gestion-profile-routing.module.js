"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.GestionProfileRoutingModule = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var informations_component_1 = require("./informations/informations.component");
var gestion_profile_component_1 = require("./gestion-profile.component");
var home_component_1 = require("./home/home.component");
var auth_guard_service_1 = require("../services/auth-guard.service");
var search_partner_component_1 = require("./search-partner/search-partner.component");
var physique_component_1 = require("./physique/physique.component");
var routes = [
    { path: 'profil', canActivate: [auth_guard_service_1.AuthGuard], component: gestion_profile_component_1.GestionProfileComponent,
        children: [
            { path: '', component: home_component_1.HomeComponent },
            { path: 'informations', component: informations_component_1.InformationsComponent },
            { path: 'physique', component: physique_component_1.PhysiqueComponent }
        ]
    },
    { path: 'search-partner', component: search_partner_component_1.SearchPartenerComponent }
];
var GestionProfileRoutingModule = /** @class */ (function () {
    function GestionProfileRoutingModule() {
    }
    GestionProfileRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forChild(routes)],
            exports: [router_1.RouterModule]
        })
    ], GestionProfileRoutingModule);
    return GestionProfileRoutingModule;
}());
exports.GestionProfileRoutingModule = GestionProfileRoutingModule;
