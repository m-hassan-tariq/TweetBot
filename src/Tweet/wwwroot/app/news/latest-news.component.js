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
var loader_service_1 = require('../shared/service/loader.service');
var web_api_observable_service_1 = require('../shared/service/web-api-observable.service');
var toaster_service_1 = require('../shared/service/toaster.service');
//import * as _ from "lodash";
var LatestNewsComponent = (function () {
    function LatestNewsComponent(loaderService, toasterService, webApiObservableService, tweetService) {
        this.loaderService = loaderService;
        this.toasterService = toasterService;
        this.webApiObservableService = webApiObservableService;
        this.tweetService = tweetService;
        this.articleList = [];
        this.selectedArticleList = [];
        this.sourceList = [];
        this.sourceName = 'All';
        this.selectAllFlag = false;
        this.selectCounter = 0;
    }
    LatestNewsComponent.prototype.ngOnInit = function () {
        this.getAllLatestNews();
    };
    LatestNewsComponent.prototype.getAllLatestNews = function () {
        var _this = this;
        this.articleList = [];
        this.sourceList = [];
        this.webApiObservableService
            .getService('api/Tweet/AllLatestNews')
            .subscribe(function (result) {
            if (result) {
                _this.sourceList = result.map(function (item) { return item.source; }).filter(function (value, index, self) { return self.indexOf(value) === index; });
                _this.sourceList.push('All');
                _this.sourceList.sort();
                _this.resetGrid(result);
                _this.articleList = result;
                _this.loaderService.display(false);
                _this.toasterService.showToaster('Latest News have been loaded');
            }
        }, function (error) {
            _this.loaderService.display(false);
            _this.toasterService.showToaster(error);
        });
    };
    LatestNewsComponent.prototype.filterGridBySource = function (source) {
        this.sourceName = source;
        this.resetGrid(this.articleList);
    };
    LatestNewsComponent.prototype.selectAll = function () {
        var _this = this;
        this.selectCounter = 0;
        this.selectAllFlag = !this.selectAllFlag;
        this.articleList.forEach(function (v, i) {
            if (v.source == _this.sourceName || _this.sourceName == 'All') {
                _this.selectCounter = _this.selectAllFlag == true ? _this.selectCounter + 1 : 0;
                v.selected = _this.selectAllFlag;
            }
            else {
                v.selected = !_this.selectAllFlag;
            }
        });
    };
    LatestNewsComponent.prototype.selectOneItem = function (item) {
        item.selected = !item.selected;
        if (item.selected == true) {
            this.selectCounter = this.selectCounter + 1;
        }
        else {
            this.selectCounter = this.selectCounter - 1;
            this.selectAllFlag = false;
        }
        ;
    };
    LatestNewsComponent.prototype.sendTweet = function (item) {
        this.tweetService.postNewsTweet(item.title, item.url);
    };
    LatestNewsComponent.prototype.sendAllTweet = function () {
        this.tweetService.postAllNewsTweet('latest');
    };
    LatestNewsComponent.prototype.sendSelectedTweet = function () {
        var _this = this;
        this.selectedArticleList = [];
        this.articleList.forEach(function (v, i) {
            if (v.selected == true) {
                _this.selectedArticleList.push(_this.articleList[i]);
                v.selected = false;
            }
        });
        if (this.selectedArticleList.length > 0) {
            this.tweetService.postSelectedNewsTweet(this.selectedArticleList);
            this.resetGrid(this.articleList);
        }
    };
    LatestNewsComponent.prototype.resetGrid = function (result) {
        this.selectCounter = 0;
        this.selectAllFlag = false;
        result.forEach(function (v, i) {
            v.selected = false;
        });
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
        __metadata('design:paramtypes', [loader_service_1.LoaderService, toaster_service_1.ToasterService, web_api_observable_service_1.WebApiObservableService, tweet_service_1.TweetService])
    ], LatestNewsComponent);
    return LatestNewsComponent;
}());
exports.LatestNewsComponent = LatestNewsComponent;
//# sourceMappingURL=latest-news.component.js.map