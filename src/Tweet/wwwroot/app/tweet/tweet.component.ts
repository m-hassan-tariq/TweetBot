import { Component, OnInit } from '@angular/core';

import { WebApiObservableService } from '../shared/service/web-api-observable.service';
import { WebApiPromiseService } from '../shared/service/web-api-promise.service';

@Component({
    selector: 'tweet',
    templateUrl: './app/tweet/tweet.component.html'
})

export class TweetComponent implements OnInit {

    constructor(
        private webApiObservableService: WebApiObservableService) {
    }

    ngOnInit() {
    }

    get diagnostic(): string {
        return JSON.stringify("testing");
    }
}