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
var web_api_observable_service_1 = require('../shared/service/web-api-observable.service');
var TweetComponent = (function () {
    function TweetComponent(webApiObservableService) {
        this.webApiObservableService = webApiObservableService;
    }
    TweetComponent.prototype.ngOnInit = function () {
    };
    Object.defineProperty(TweetComponent.prototype, "diagnostic", {
        get: function () {
            return JSON.stringify("testing");
        },
        enumerable: true,
        configurable: true
    });
    TweetComponent = __decorate([
        core_1.Component({
            selector: 'tweet',
            templateUrl: './app/tweet/tweet.component.html'
        }), 
        __metadata('design:paramtypes', [web_api_observable_service_1.WebApiObservableService])
    ], TweetComponent);
    return TweetComponent;
}());
exports.TweetComponent = TweetComponent;
//# sourceMappingURL=tweet.component.js.map