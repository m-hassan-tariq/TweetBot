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
var web_api_observable_service_1 = require('../shared/service/web-api-observable.service');
var twitter_timeline_service_1 = require('../shared/service/twitter-timeline.service');
var tweet_service_1 = require('../shared/service/tweet.service');
var toaster_service_1 = require('../shared/service/toaster.service');
var TweetComponent = (function () {
    //@Input() tweetId: string;
    function TweetComponent(
        //private element: ElementRef,
        tweetService, toasterService, webApiObservableService, twitterTimelineService) {
        this.tweetService = tweetService;
        this.toasterService = toasterService;
        this.webApiObservableService = webApiObservableService;
        this.twitterTimelineService = twitterTimelineService;
        this.title = '';
        this.url = '';
    }
    TweetComponent.prototype.ngOnInit = function () {
    };
    TweetComponent.prototype.ngAfterViewInit = function () {
        this.twitterTimelineService.loadTimeLineWidget();
    };
    //ngAfterViewInit() {
    //    //MAKE SURE TWITTER WIDGET SCRIPT IS LOADED IN HEAD...
    //    console.log('Created tweet widget: ');
    //    this.twitterTimelineService.LoadScript().subscribe
    //        ( //SUCCESS, WE HAVE TWITTER WIDGETS JS FILE LOADED...
    //        twttr => {
    //            let nativeElement = this.element.nativeElement;
    //            //console.log(nativeElement);
    //            window['twttr'].widgets.createTweet(this.tweetId, nativeElement, {}).then
    //                (function success(embed) {
    //                    console.log('Created tweet widget: ', embed);
    //                }).catch
    //                (function creationError(message) {
    //                    console.log('Could not create widget: ', message);
    //                });
    //        },
    //        //ERROR
    //        err => {
    //            console.log('****  ERROR LOADING TWITTER WIDGET', err);
    //        },
    //        //COMPLETE
    //        () => {});
    //}
    //private onTwitterLoaded(twttr) {
    //    console.log('TWITTER LOADED YO', twttr);
    //};
    TweetComponent.prototype.sendTweet = function () {
        if (this.title) {
            this.tweetService.postTweet(this.title, this.url);
        }
        else {
            this.toasterService.showToaster('enter title please!!');
        }
    };
    TweetComponent.prototype.refreshPage = function () {
        window.location.reload();
    };
    Object.defineProperty(TweetComponent.prototype, "diagnostic", {
        get: function () {
            return JSON.stringify("testing");
        },
        enumerable: true,
        configurable: true
    });
    TweetComponent = __decorate([
        core_1.Component({
            selector: 'tweet',
            templateUrl: './app/tweet/tweet.component.html'
        }), 
        __metadata('design:paramtypes', [tweet_service_1.TweetService, toaster_service_1.ToasterService, web_api_observable_service_1.WebApiObservableService, twitter_timeline_service_1.TwitterTimelineService])
    ], TweetComponent);
    return TweetComponent;
}());
exports.TweetComponent = TweetComponent;
//# sourceMappingURL=tweet.component.js.map