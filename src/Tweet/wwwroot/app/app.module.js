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
var http_1 = require('@angular/http');
var platform_browser_1 = require('@angular/platform-browser');
var primeng_1 = require('primeng/primeng');
var primeng_2 = require('primeng/primeng');
var ng_lightning_1 = require('ng-lightning/ng-lightning');
var dashboard_module_1 = require('./dashboard/dashboard.module');
var app_component_1 = require('./app.component');
var app_routing_1 = require('./app.routing');
var app_provider_1 = require('./app.provider');
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                //angular builtin module
                platform_browser_1.BrowserModule,
                http_1.HttpModule,
                //ui module
                ng_lightning_1.NglModule.forRoot(),
                primeng_1.GrowlModule,
                primeng_2.BreadcrumbModule,
                //application feature module
                dashboard_module_1.DashboardMainModule,
                app_routing_1.AppRoutingModule
            ],
            declarations: [
                app_component_1.AppComponent
            ],
            providers: [
                app_provider_1.APP_PROVIDERS
            ],
            bootstrap: [
                app_component_1.AppComponent
            ],
            schemas: [
                core_1.CUSTOM_ELEMENTS_SCHEMA
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map