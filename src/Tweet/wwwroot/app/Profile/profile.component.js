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
var web_api_observable_service_1 = require("../shared/service/web-api-observable.service");
var twitter_timeline_service_1 = require("../shared/service/twitter-timeline.service");
var ProfileComponent = (function () {
    function ProfileComponent(element, webApiObservableService, twitterTimelineService) {
        this.element = element;
        this.webApiObservableService = webApiObservableService;
        this.twitterTimelineService = twitterTimelineService;
    }
    ProfileComponent.prototype.ngOnInit = function () {
    };
    ProfileComponent.prototype.ngAfterViewInit = function () {
        this.twitterTimelineService.loadTimeLineWidget();
    };
    ProfileComponent.prototype.refreshPage = function () {
        window.location.reload();
    };
    Object.defineProperty(ProfileComponent.prototype, "diagnostic", {
        get: function () {
            return JSON.stringify("testing");
        },
        enumerable: true,
        configurable: true
    });
    return ProfileComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], ProfileComponent.prototype, "tweetId", void 0);
ProfileComponent = __decorate([
    core_1.Component({
        selector: 'profile',
        templateUrl: './app/profile/profile.component.html'
    }),
    __metadata("design:paramtypes", [core_1.ElementRef,
        web_api_observable_service_1.WebApiObservableService,
        twitter_timeline_service_1.TwitterTimelineService])
], ProfileComponent);
exports.ProfileComponent = ProfileComponent;
//# sourceMappingURL=profile.component.js.map