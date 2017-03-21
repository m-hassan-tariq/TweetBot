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
var lastUpdatedDateTime_service_1 = require("../shared/service/lastUpdatedDateTime.service");
var DashboardComponent = (function () {
    function DashboardComponent(loaderService, toasterService, webApiObservableService, lastUpdatedDateTimeService, tweetService) {
        this.loaderService = loaderService;
        this.toasterService = toasterService;
        this.webApiObservableService = webApiObservableService;
        this.lastUpdatedDateTimeService = lastUpdatedDateTimeService;
        this.tweetService = tweetService;
        this.lastestArticleList = [];
        this.topArticleList = [];
        this.topSecondaryArticleList = [];
        this.sourceList = [];
        this.secondarySourceList = [];
        this.blogList = [];
        this.categoryList = [];
        this.newsTypeList = ['top', 'latest'];
        this.categoryValue = '';
        this.sourceValue = '';
        this.newsTypeValue = '';
        this.content = '';
    }
    DashboardComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.lastUpdatedDateTimeService.latestNewsUpdatedTime.subscribe(function (val) {
            _this.latestNewsUpdatedTime = val;
        });
        this.lastUpdatedDateTimeService.topNewsUpdatedTime.subscribe(function (val) {
            _this.topNewsUpdatedTime = val;
        });
        this.lastUpdatedDateTimeService.lastTweetUpdatedTime.subscribe(function (val) {
            _this.lastTweetUpdatedTime = val;
        });
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
                _this.categoryList = result.map(function (item) { return item.category; }).filter(function (value, index, self) { return self.indexOf(value) === index; }).sort();
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
                _this.sourceList = result.map(function (item) { return item.source; }).filter(function (value, index, self) { return self.indexOf(value) === index; }).sort();
                _this.lastestArticleList = result;
                _this.newLatestNewsToPost = _this.lastestArticleList.filter(function (value, index, self) { return new Date(value.publishedAt) > new Date(_this.latestNewsUpdatedTime); }).length;
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
                _this.newTopNewsToPost = _this.topArticleList.filter(function (value, index, self) { return new Date(value.publishedAt) > new Date(_this.topNewsUpdatedTime); }).length;
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
                _this.secondarySourceList = result.map(function (item) { return item.source; }).filter(function (value, index, self) { return self.indexOf(value) === index; }).sort();
                _this.sourceList = _this.sourceList.concat(_this.secondarySourceList).sort();
                _this.topSecondaryArticleList = result;
                _this.loaderService.display(false);
                _this.toasterService.showToaster('Dashboard have been loaded');
            }
        }, function (error) {
            _this.loaderService.display(false);
            _this.toasterService.showToaster(error);
        });
    };
    DashboardComponent.prototype.sendContent = function () {
        if (this.content) {
            this.tweetService.postContent(this.content);
            this.content = '';
        }
        else {
            this.toasterService.showToaster('Content is missing!!');
        }
    };
    DashboardComponent.prototype.tweetNewsBySource = function (sortBy, source) {
        if (sortBy && source) {
            this.tweetService.postNewsBySource(sortBy, source);
            this.sourceValue = '';
            this.newsTypeValue = '';
        }
        else {
            this.toasterService.showToaster('News type or Source is missing!!');
        }
    };
    DashboardComponent.prototype.tweetAllNews = function (sortBy) {
        this.tweetService.postAllNewsTweet(sortBy);
        if (sortBy == 'latest')
            this.newLatestNewsToPost = 0;
        else
            this.newTopNewsToPost = 0;
    };
    DashboardComponent.prototype.tweetAllBlogPosts = function () {
        this.tweetService.postAllBlogTweet();
    };
    DashboardComponent.prototype.tweetAllBlogPostsByCategory = function () {
        if (this.categoryValue) {
            this.tweetService.postBlogByCategoryTweet(this.categoryValue);
            this.categoryValue = '';
        }
        else {
            this.toasterService.showToaster('Choose blog posts category!!');
        }
    };
    Object.defineProperty(DashboardComponent.prototype, "diagnostic", {
        get: function () {
            return JSON.stringify("testing");
        },
        enumerable: true,
        configurable: true
    });
    return DashboardComponent;
}());
DashboardComponent = __decorate([
    core_1.Component({
        selector: 'dashboard',
        templateUrl: './app/dashboard/dashboard.component.html'
    }),
    __metadata("design:paramtypes", [loader_service_1.LoaderService,
        toaster_service_1.ToasterService,
        web_api_observable_service_1.WebApiObservableService,
        lastUpdatedDateTime_service_1.LastUpdatedDateTimeService,
        tweet_service_1.TweetService])
], DashboardComponent);
exports.DashboardComponent = DashboardComponent;
//# sourceMappingURL=dashboard.component.js.map