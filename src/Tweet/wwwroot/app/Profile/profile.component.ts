import { Component, OnInit, Input, AfterViewInit, ElementRef } from '@angular/core';

import { WebApiObservableService } from '../shared/service/web-api-observable.service';
import { WebApiPromiseService } from '../shared/service/web-api-promise.service';
import { TwitterTimelineService } from '../shared/service/twitter-timeline.service';

@Component({
    selector: 'profile',
    templateUrl: './app/profile/profile.component.html'
})


export class ProfileComponent implements OnInit, AfterViewInit {
    @Input() tweetId: string;
    constructor(
        private element: ElementRef,
        private webApiObservableService: WebApiObservableService,
        private twitterTimelineService: TwitterTimelineService) {
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
        this.twitterTimelineService.loadTimeLineWidget();
    }

    refreshPage() {
        window.location.reload();
    }

    get diagnostic(): string {
        return JSON.stringify("testing");
    }
}