"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var material_1 = require('@angular/material');
var web_api_observable_service_1 = require('../shared/service/web-api-observable.service');
var DashboardComponent = (function () {
    function DashboardComponent(webApiObservableService, dialog) {
        this.webApiObservableService = webApiObservableService;
        this.dialog = dialog;
    }
    DashboardComponent.prototype.openDialog = function () {
        var dialogRef = this.dialog.open(DialogResultExampleDialog);
    };
    DashboardComponent.prototype.ngOnInit = function () {
    };
    Object.defineProperty(DashboardComponent.prototype, "diagnostic", {
        get: function () {
            return JSON.stringify("testing");
        },
        enumerable: true,
        configurable: true
    });
    DashboardComponent = __decorate([
        core_1.Component({
            selector: 'search-movie-list',
            templateUrl: './app/dashboard/dashboard.component.html',
            styleUrls: ['./app/dashboard/dashboard.component.css']
        }), 
        __metadata('design:paramtypes', [web_api_observable_service_1.WebApiObservableService, material_1.MdDialog])
    ], DashboardComponent);
    return DashboardComponent;
}());
exports.DashboardComponent = DashboardComponent;
var DialogResultExampleDialog = (function () {
    function DialogResultExampleDialog() {
    }
    DialogResultExampleDialog = __decorate([
        core_1.Component({
            selector: 'dialog-result-example-dialog',
            template: 'Testing',
        }), 
        __metadata('design:paramtypes', [])
    ], DialogResultExampleDialog);
    return DialogResultExampleDialog;
}());
exports.DialogResultExampleDialog = DialogResultExampleDialog;
//# sourceMappingURL=dashboard.component.js.map