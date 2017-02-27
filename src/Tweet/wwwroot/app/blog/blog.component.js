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
var BlogComponent = (function () {
    function BlogComponent(loaderService, toasterService, webApiObservableService, tweetService) {
        this.loaderService = loaderService;
        this.toasterService = toasterService;
        this.webApiObservableService = webApiObservableService;
        this.tweetService = tweetService;
        this.blogList = [];
        this.selectedBlogList = [];
        this.categoryList = [];
        this.categoryName = 'All';
        this.selectAllFlag = false;
        this.selectCounter = 0;
    }
    BlogComponent.prototype.ngOnInit = function () {
        this.getAllBlogPosts();
    };
    BlogComponent.prototype.getAllBlogPosts = function () {
        var _this = this;
        this.blogList = [];
        this.categoryList = [];
        this.webApiObservableService
            .getService('api/Tweet/AllBlog')
            .subscribe(function (result) {
            if (result) {
                _this.categoryList = result.map(function (item) { return item.category; }).filter(function (value, index, self) { return self.indexOf(value) === index; });
                _this.categoryList.push('All');
                _this.categoryList.sort();
                _this.resetGrid(result);
                _this.blogList = result;
                _this.loaderService.display(false);
                _this.toasterService.showToaster('Blog posts have been loaded');
            }
        }, function (error) {
            _this.loaderService.display(false);
            _this.toasterService.showToaster(error);
        });
    };
    BlogComponent.prototype.filterGridByCategory = function (category) {
        this.categoryName = category;
        this.resetGrid(this.blogList);
    };
    BlogComponent.prototype.selectAll = function () {
        var _this = this;
        this.selectCounter = 0;
        this.selectAllFlag = !this.selectAllFlag;
        this.blogList.forEach(function (v, i) {
            if (v.category == _this.categoryName || _this.categoryName == 'All') {
                _this.selectCounter = _this.selectAllFlag == true ? _this.selectCounter + 1 : 0;
                v.selected = _this.selectAllFlag;
            }
            else {
                v.selected = !_this.selectAllFlag;
            }
        });
    };
    BlogComponent.prototype.selectOneItem = function (item) {
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
    BlogComponent.prototype.sendTweet = function (item) {
        this.tweetService.postTweet(item.header, item.url);
    };
    BlogComponent.prototype.sendAllTweet = function () {
        this.tweetService.postAllBlogTweet();
    };
    BlogComponent.prototype.sendSelectedTweet = function () {
        var _this = this;
        this.selectedBlogList = [];
        this.blogList.forEach(function (v, i) {
            if (v.selected == true) {
                _this.selectedBlogList.push(_this.blogList[i]);
                v.selected = false;
            }
        });
        if (this.selectedBlogList.length > 0) {
            this.tweetService.postSelectedBlogTweet(this.selectedBlogList);
            this.resetGrid(this.blogList);
        }
    };
    BlogComponent.prototype.resetGrid = function (result) {
        this.selectCounter = 0;
        this.selectAllFlag = false;
        result.forEach(function (v, i) {
            v.selected = false;
        });
    };
    Object.defineProperty(BlogComponent.prototype, "diagnostic", {
        get: function () {
            return JSON.stringify("testing");
        },
        enumerable: true,
        configurable: true
    });
    BlogComponent = __decorate([
        core_1.Component({
            selector: 'blog',
            templateUrl: './app/blog/blog.component.html'
        }), 
        __metadata('design:paramtypes', [loader_service_1.LoaderService, toaster_service_1.ToasterService, web_api_observable_service_1.WebApiObservableService, tweet_service_1.TweetService])
    ], BlogComponent);
    return BlogComponent;
}());
exports.BlogComponent = BlogComponent;
//# sourceMappingURL=blog.component.js.map