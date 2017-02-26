import { Component, OnInit } from '@angular/core';

import { WebApiObservableService } from '../shared/service/web-api-observable.service';
import { WebApiPromiseService } from '../shared/service/web-api-promise.service';

@Component({
    selector: 'top-news',
    templateUrl: './app/news/top-news.component.html'
})

export class TopNewsComponent implements OnInit {

    constructor(
        private webApiObservableService: WebApiObservableService) {
    }

    ngOnInit() {
    }

    get diagnostic(): string {
        return JSON.stringify("testing");
    }
}