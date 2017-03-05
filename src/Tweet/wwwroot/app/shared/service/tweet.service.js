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
var loader_service_1 = require('./loader.service');
var web_api_observable_service_1 = require('./web-api-observable.service');
var toaster_service_1 = require('./toaster.service');
var lastUpdatedDateTime_service_1 = require('./lastUpdatedDateTime.service');
var TweetService = (function () {
    function TweetService(loaderService, lastUpdatedDateTimeService, toasterService, webApiObservableService) {
        this.loaderService = loaderService;
        this.lastUpdatedDateTimeService = lastUpdatedDateTimeService;
        this.toasterService = toasterService;
        this.webApiObservableService = webApiObservableService;
    }
    TweetService.prototype.postContent = function (text) {
        var _this = this;
        var content = text.substring(0, 140);
        this.webApiObservableService
            .getServiceWithFixedQueryString('api/Tweet/PostTweet', content)
            .subscribe(function (result) {
            _this.successCB("Content is tweeted");
        }, function (error) {
            _this.handleError(error);
        });
    };
    TweetService.prototype.postTweet = function (title, url) {
        var _this = this;
        var content = title.substring(0, 100) + ' ' + url;
        this.webApiObservableService
            .getServiceWithFixedQueryString('api/Tweet/PostTweet', content)
            .subscribe(function (result) {
            _this.successCB("Post with title: " + title + " is tweeted");
        }, function (error) {
            _this.handleError(error);
        });
    };
    TweetService.prototype.postNewsBySource = function (sortBy, source) {
        var _this = this;
        var url = sortBy == 'latest' ? 'PostLatestNews' : 'PostTopNews';
        this.webApiObservableService
            .getServiceWithDynamicQueryTerm('api/Tweet/' + url, 'source', source)
            .subscribe(function (result) {
            _this.successCB("All news posts of " + source + "have been tweeted");
        }, function (error) {
            _this.handleError(error);
        });
    };
    TweetService.prototype.postAllNewsTweet = function (sortBy) {
        var _this = this;
        var url = sortBy == 'latest' ? 'PostAllLatestNews' : 'PostAllTopNews';
        this.webApiObservableService
            .getService('api/Tweet/' + url)
            .subscribe(function (result) {
            _this.successCB("All " + sortBy + " news posts have been tweeted");
        }, function (error) {
            _this.handleError(error);
        });
    };
    TweetService.prototype.postSelectedNewsTweet = function (articleList) {
        var _this = this;
        this.webApiObservableService
            .createService('api/Tweet/PostSelectedNews', articleList)
            .subscribe(function (result) {
            _this.successCB("All selected news posts have been tweeted");
        }, function (error) {
            _this.handleError(error);
        });
    };
    TweetService.prototype.postAllBlogTweet = function () {
        var _this = this;
        this.webApiObservableService
            .getService('api/Tweet/PostAllBlog')
            .subscribe(function (result) {
            _this.successCB("All blog posts are tweeted");
        }, function (error) {
            _this.handleError(error);
        });
    };
    TweetService.prototype.postBlogByCategoryTweet = function (category) {
        var _this = this;
        this.webApiObservableService
            .getServiceWithDynamicQueryTerm('api/Tweet/PostBlogByCategory', 'category', category)
            .subscribe(function (result) {
            _this.successCB("All blog posts of " + category + " are tweeted");
        }, function (error) {
            _this.handleError(error);
        });
    };
    TweetService.prototype.postSelectedBlogTweet = function (blogList) {
        var _this = this;
        this.webApiObservableService
            .createService('api/Tweet/PostSelectedBlog', blogList)
            .subscribe(function (result) {
            _this.successCB("All selected blog posts have been tweeted");
        }, function (error) {
            _this.handleError(error);
        });
    };
    TweetService.prototype.successCB = function (text) {
        this.lastUpdatedDateTimeService.getUpdatedTime();
        this.loaderService.display(false);
        this.toasterService.showToaster(text);
    };
    TweetService.prototype.handleError = function (error) {
        this.toasterService.showToaster(error);
        this.loaderService.display(false);
    };
    TweetService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [loader_service_1.LoaderService, lastUpdatedDateTime_service_1.LastUpdatedDateTimeService, toaster_service_1.ToasterService, web_api_observable_service_1.WebApiObservableService])
    ], TweetService);
    return TweetService;
}());
exports.TweetService = TweetService;
//# sourceMappingURL=tweet.service.js.map