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
var dashboard_component_1 = require('./dashboard/dashboard.component');
var profile_component_1 = require('./profile/profile.component');
var tweet_component_1 = require('./tweet/tweet.component');
var latest_news_component_1 = require('./news/latest-news.component');
var top_news_component_1 = require('./news/top-news.component');
var blog_component_1 = require('./blog/blog.component');
var AppRoutingModule = (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [
                router_1.RouterModule.forRoot([
                    {
                        path: '',
                        redirectTo: '/dashboard',
                        pathMatch: 'full',
                        data: { title: 'Dashboard' }
                    },
                    {
                        path: 'dashboard',
                        component: dashboard_component_1.DashboardComponent,
                        pathMatch: 'full',
                        data: { title: 'Dashboard' }
                    },
                    {
                        path: 'profile',
                        component: profile_component_1.ProfileComponent,
                        pathMatch: 'full',
                        data: { title: 'Twitter Profile' }
                    },
                    {
                        path: 'tweet',
                        component: tweet_component_1.TweetComponent,
                        pathMatch: 'full',
                        data: { title: 'Tweet' }
                    },
                    {
                        path: 'latest-news',
                        component: latest_news_component_1.LatestNewsComponent,
                        pathMatch: 'full',
                        data: { title: 'Latest News' }
                    },
                    {
                        path: 'top-news',
                        component: top_news_component_1.TopNewsComponent,
                        pathMatch: 'full',
                        data: { title: 'Top News' }
                    },
                    {
                        path: 'blog',
                        component: blog_component_1.BlogComponent,
                        pathMatch: 'full',
                        data: { title: 'Blog' }
                    }
                ])
            ],
            exports: [
                router_1.RouterModule
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
//# sourceMappingURL=app.routing.js.map