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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var tweet_service_1 = require("../shared/service/tweet.service");
var loader_service_1 = require("../shared/service/loader.service");
var web_api_observable_service_1 = require("../shared/service/web-api-observable.service");
var toaster_service_1 = require("../shared/service/toaster.service");
//import * as _ from "lodash";
var TopNewsComponent = (function () {
    function TopNewsComponent(loaderService, toasterService, webApiObservableService, tweetService) {
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
    TopNewsComponent.prototype.ngOnInit = function () {
        this.getAllTopNews();
    };
    TopNewsComponent.prototype.getAllTopNews = function () {
        var _this = this;
        this.articleList = [];
        this.sourceList = [];
        this.webApiObservableService
            .getService('api/Tweet/AllTopNews')
            .subscribe(function (result) {
            if (result) {
                _this.sourceList = result.map(function (item) { return item.source; }).filter(function (value, index, self) { return self.indexOf(value) === index; });
                _this.sourceList.push('All');
                _this.sourceList.sort();
                _this.resetGrid(result);
                _this.articleList = result;
                _this.loaderService.display(false);
                _this.toasterService.showToaster('Top News have been loaded');
            }
        }, function (error) {
            _this.loaderService.display(false);
            _this.toasterService.showToaster(error);
        });
    };
    TopNewsComponent.prototype.filterGridBySource = function (source) {
        this.sourceName = source;
        this.resetGrid(this.articleList);
    };
    TopNewsComponent.prototype.selectAll = function () {
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
    TopNewsComponent.prototype.selectOneItem = function (item) {
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
    TopNewsComponent.prototype.sendTweet = function (item) {
        this.tweetService.postTweet(item.title, item.url);
    };
    TopNewsComponent.prototype.sendAllTweet = function () {
        this.tweetService.postAllNewsTweet('top');
    };
    TopNewsComponent.prototype.sendSelectedTweet = function () {
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
    TopNewsComponent.prototype.resetGrid = function (result) {
        this.selectCounter = 0;
        this.selectAllFlag = false;
        result.forEach(function (v, i) {
            v.selected = false;
        });
    };
    Object.defineProperty(TopNewsComponent.prototype, "diagnostic", {
        get: function () {
            return JSON.stringify("testing");
        },
        enumerable: true,
        configurable: true
    });
    return TopNewsComponent;
}());
TopNewsComponent = __decorate([
    core_1.Component({
        selector: 'top-news',
        templateUrl: './app/news/top-news.component.html'
    }),
    __metadata("design:paramtypes", [loader_service_1.LoaderService,
        toaster_service_1.ToasterService,
        web_api_observable_service_1.WebApiObservableService,
        tweet_service_1.TweetService])
], TopNewsComponent);
exports.TopNewsComponent = TopNewsComponent;
//# sourceMappingURL=top-news.component.js.map