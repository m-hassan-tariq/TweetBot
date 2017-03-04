"use strict";
var web_api_observable_service_1 = require('./shared/service/web-api-observable.service');
var web_api_promise_service_1 = require('./shared/service/web-api-promise.service');
var tweet_service_1 = require('./shared/service/tweet.service');
var toaster_service_1 = require('./shared/service/toaster.service');
var loader_service_1 = require('./shared/service/loader.service');
var twitter_timeline_service_1 = require('./shared/service/twitter-timeline.service');
var dashboard_component_1 = require('./dashboard/dashboard.component');
var tweet_component_1 = require('./tweet/tweet.component');
var profile_component_1 = require('./profile/profile.component');
var latest_news_component_1 = require('./news/latest-news.component');
var top_news_component_1 = require('./news/top-news.component');
var blog_component_1 = require('./blog/blog.component');
var searchfilter_pipe_1 = require('./shared/service/searchfilter.pipe');
var sortgrid_pipe_1 = require('./shared/service/sortgrid.pipe');
exports.All_Services = [
    web_api_observable_service_1.WebApiObservableService,
    web_api_promise_service_1.WebApiPromiseService,
    tweet_service_1.TweetService,
    toaster_service_1.ToasterService,
    loader_service_1.LoaderService,
    twitter_timeline_service_1.TwitterTimelineService
];
exports.All_Components = [
    dashboard_component_1.DashboardComponent,
    profile_component_1.ProfileComponent,
    tweet_component_1.TweetComponent,
    latest_news_component_1.LatestNewsComponent,
    top_news_component_1.TopNewsComponent,
    blog_component_1.BlogComponent,
];
exports.All_Filters = [
    searchfilter_pipe_1.SearchFilterPipe,
    sortgrid_pipe_1.SortGridPipe
];
//# sourceMappingURL=app.provider.js.map