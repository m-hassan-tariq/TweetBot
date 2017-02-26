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
var tweet_service_1 = require('../shared/service/tweet.service');
var web_api_observable_service_1 = require('../shared/service/web-api-observable.service');
var toaster_service_1 = require('../shared/service/toaster.service');
//import * as _ from "lodash";
var LatestNewsComponent = (function () {
    function LatestNewsComponent(toasterService, webApiObservableService, tweetService) {
        this.toasterService = toasterService;
        this.webApiObservableService = webApiObservableService;
        this.tweetService = tweetService;
        this.sourceList = [];
        this.sourceName = 'All';
    }
    LatestNewsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.webApiObservableService
            .getService('api/Tweet/AllLatestNews')
            .subscribe(function (result) {
            if (result) {
                _this.sourceList = result.map(function (item) { return item.source; })
                    .filter(function (value, index, self) { return self.indexOf(value) === index; });
                _this.sourceList.push('All');
                _this.sourceList.sort();
                _this.articleList = result;
                _this.toasterService.showToaster('Latest News have been loaded');
            }
        }, function (error) {
            _this.toasterService.showToaster(error);
        });
    };
    LatestNewsComponent.prototype.sendTweet = function (item) {
        this.tweetService.postNewsTweet(item.title, item.url);
    };
    LatestNewsComponent.prototype.sendAllTweet = function () {
        this.tweetService.postAllNewsTweet('latest');
    };
    Object.defineProperty(LatestNewsComponent.prototype, "diagnostic", {
        get: function () {
            return JSON.stringify("testing");
        },
        enumerable: true,
        configurable: true
    });
    LatestNewsComponent = __decorate([
        core_1.Component({
            selector: 'latest-news',
            templateUrl: './app/news/latest-news.component.html'
        }), 
        __metadata('design:paramtypes', [toaster_service_1.ToasterService, web_api_observable_service_1.WebApiObservableService, tweet_service_1.TweetService])
    ], LatestNewsComponent);
    return LatestNewsComponent;
}());
exports.LatestNewsComponent = LatestNewsComponent;
//# sourceMappingURL=latest-news.component.js.map