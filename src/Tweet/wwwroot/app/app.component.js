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
var router_1 = require('@angular/router');
var loader_service_1 = require('./shared/service/loader.service');
var AppComponent = (function () {
    function AppComponent(loaderService, router, route) {
        this.loaderService = loaderService;
        this.router = router;
        this.route = route;
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.router.events
            .filter(function (event) { return event instanceof router_1.NavigationEnd; })
            .subscribe(function () {
            var root = _this.router.routerState.snapshot.root;
            while (root) {
                if (root.children && root.children.length) {
                    root = root.children[0];
                }
                else if (root.data && root.data["title"]) {
                    _this.pageTitle = root.data["title"];
                    return;
                }
                else {
                    return;
                }
            }
        });
        this.loaderService.status.subscribe(function (val) {
            _this.showLoader = val;
        });
    };
    AppComponent.prototype.onCloseAlert = function (reason) {
    };
    AppComponent.prototype.ngAfterViewChecked = function () {
    };
    AppComponent.prototype.ngAfterContentInit = function () {
    };
    AppComponent.prototype.ngAfterViewInit = function () {
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: './app/app.component.html',
            styleUrls: ['./app/app.component.css']
        }), 
        __metadata('design:paramtypes', [loader_service_1.LoaderService, router_1.Router, router_1.ActivatedRoute])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map