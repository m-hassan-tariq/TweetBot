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
var DashboardComponent = (function () {
    function DashboardComponent(loaderService, toasterService, webApiObservableService, tweetService) {
        this.loaderService = loaderService;
        this.toasterService = toasterService;
        this.webApiObservableService = webApiObservableService;
        this.tweetService = tweetService;
        this.lastestArticleList = [];
        this.topArticleList = [];
        this.topSecondaryArticleList = [];
        this.sourceList = [];
        this.blogList = [];
        this.categoryList = [];
        this.categoryValue = "";
    }
    DashboardComponent.prototype.ngOnInit = function () {
        this.getAllBlogPosts();
    };
    DashboardComponent.prototype.getAllBlogPosts = function () {
        var _this = this;
        this.blogList = [];
        this.categoryList = [];
        this.webApiObservableService
            .getService('api/Tweet/AllBlog')
            .subscribe(function (result) {
            if (result) {
                _this.categoryList = result.map(function (item) { return item.category; }).filter(function (value, index, self) { return self.indexOf(value) === index; });
                _this.categoryList.sort();
                //this.categoryValue = this.categoryList ? this.categoryList[0] : '';
                _this.blogList = result;
                _this.getAllLatestNews();
            }
        }, function (error) {
            _this.loaderService.display(false);
            _this.toasterService.showToaster(error);
        });
    };
    DashboardComponent.prototype.getAllLatestNews = function () {
        var _this = this;
        this.lastestArticleList = [];
        this.sourceList = [];
        this.webApiObservableService
            .getService('api/Tweet/AllLatestNews')
            .subscribe(function (result) {
            if (result) {
                _this.sourceList = result.map(function (item) { return item.source; }).filter(function (value, index, self) { return self.indexOf(value) === index; });
                _this.sourceList.sort();
                _this.lastestArticleList = result;
                _this.getAllTopNews();
            }
        }, function (error) {
            _this.loaderService.display(false);
            _this.toasterService.showToaster(error);
        });
    };
    DashboardComponent.prototype.getAllTopNews = function () {
        var _this = this;
        this.topArticleList = [];
        this.webApiObservableService
            .getService('api/Tweet/AllTopNews')
            .subscribe(function (result) {
            if (result) {
                _this.topArticleList = result;
                _this.getAllSecondaryTopNews();
            }
        }, function (error) {
            _this.loaderService.display(false);
            _this.toasterService.showToaster(error);
        });
    };
    DashboardComponent.prototype.getAllSecondaryTopNews = function () {
        var _this = this;
        this.topSecondaryArticleList = [];
        this.webApiObservableService
            .getService('api/Tweet/AllSecondaryTopNews')
            .subscribe(function (result) {
            if (result) {
                _this.topSecondaryArticleList = result;
                _this.loaderService.display(false);
                _this.toasterService.showToaster('Dashboard have been loaded');
            }
        }, function (error) {
            _this.loaderService.display(false);
            _this.toasterService.showToaster(error);
        });
    };
    DashboardComponent.prototype.sendTweet = function (item) {
        this.tweetService.postTweet(item.title, item.url);
    };
    DashboardComponent.prototype.tweetNewsBySource = function (sortBy, source) {
        this.tweetService.postNewsBySource(sortBy, source);
    };
    DashboardComponent.prototype.tweetAllNews = function (sortBy) {
        this.tweetService.postAllNewsTweet(sortBy);
    };
    DashboardComponent.prototype.tweetAllBlogPosts = function () {
        this.tweetService.postAllBlogTweet();
    };
    DashboardComponent.prototype.tweetAllBlogPostsByCategory = function () {
        console.log(this.categoryValue);
        //if (this.categoryValue) {
        //    this.tweetService.postBlogByCategoryTweet(this.categoryValue);
        //    this.categoryValue = '';
        //}
        //else {
        //    this.toasterService.showToaster('Choose blog posts category!!');
        //}
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
            selector: 'dashboard',
            templateUrl: './app/dashboard/dashboard.component.html'
        }), 
        __metadata('design:paramtypes', [loader_service_1.LoaderService, toaster_service_1.ToasterService, web_api_observable_service_1.WebApiObservableService, tweet_service_1.TweetService])
    ], DashboardComponent);
    return DashboardComponent;
}());
exports.DashboardComponent = DashboardComponent;
//# sourceMappingURL=dashboard.component.js.map