"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.RechercheService = void 0;
var core_1 = require("@angular/core");
var environment_1 = require("@environments/environment");
var RechercheService = /** @class */ (function () {
    function RechercheService(http) {
        this.http = http;
    }
    RechercheService.prototype.getusers = function (data) {
        return this.http.post(environment_1.environment.apiUrl + "recherche/" + localStorage.getItem('id'), data);
    };
    RechercheService.prototype.getuser = function (id) {
        return this.http.get(environment_1.environment.apiUrl + "recherche/" + id);
    };
    RechercheService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], RechercheService);
    return RechercheService;
}());
exports.RechercheService = RechercheService;
