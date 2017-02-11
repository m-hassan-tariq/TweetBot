import { Component, OnInit } from '@angular/core';

import { NewsModel } from './shared/model/news.model'
import { WebApiObservableService } from '../shared/service/web-api-observable.service';
import { WebApiPromiseService } from '../shared/service/web-api-promise.service';

@Component({
    selector: 'search-movie-list',
    templateUrl: './app/dashboard/dashboard.component.html',
    styleUrls: ['./app/dashboard/dashboard.component.css']
})

export class DashboardComponent implements OnInit {
    newsList: NewsModel[];

    constructor(
        private webApiObservableService: WebApiObservableService) {
        this.newsList = [];
    }

    ngOnInit() {
        this.populateNewsData();
    }

    populateNewsData() {
    }

    get diagnostic() : string {
        return JSON.stringify(this.newsList);
    }
}