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
var BehaviorSubject_1 = require('rxjs/BehaviorSubject');
var web_api_observable_service_1 = require('./web-api-observable.service');
var LastUpdatedDateTimeService = (function () {
    function LastUpdatedDateTimeService(webApiObservableService) {
        this.webApiObservableService = webApiObservableService;
        this.latestNewsUpdatedTime = new BehaviorSubject_1.BehaviorSubject("");
        this.topNewsUpdatedTime = new BehaviorSubject_1.BehaviorSubject("");
        this.lastTweetUpdatedTime = new BehaviorSubject_1.BehaviorSubject("");
    }
    LastUpdatedDateTimeService.prototype.getUpdatedTime = function () {
        var _this = this;
        this.webApiObservableService
            .getService('api/Tweet/LastUpdatedDateTime')
            .subscribe(function (result) {
            console.log(result);
            _this.lastTweetUpdatedTime.next(result[0]);
            _this.latestNewsUpdatedTime.next(result[1]);
            _this.topNewsUpdatedTime.next(result[2]);
        }, function (error) {
            console.log(error);
        });
    };
    LastUpdatedDateTimeService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [web_api_observable_service_1.WebApiObservableService])
    ], LastUpdatedDateTimeService);
    return LastUpdatedDateTimeService;
}());
exports.LastUpdatedDateTimeService = LastUpdatedDateTimeService;
//# sourceMappingURL=lastUpdatedDateTime.service.js.map