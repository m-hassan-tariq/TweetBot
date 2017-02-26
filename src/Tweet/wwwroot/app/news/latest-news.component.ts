import { Component, OnInit } from '@angular/core';
import { Article } from '../shared/model/article';

import { WebApiObservableService } from '../shared/service/web-api-observable.service';
import { WebApiPromiseService } from '../shared/service/web-api-promise.service';
import * as _ from "lodash";

@Component({
    selector: 'latest-news',
    templateUrl: './app/news/latest-news.component.html'
})

export class LatestNewsComponent implements OnInit {
    articleList: Article[];
    sourceList: string[];
    sourceName: string;

    constructor(
        private webApiObservableService: WebApiObservableService) {
        this.sourceList = [];
        this.sourceName = 'All';

    }

    ngOnInit() {
        this.webApiObservableService
            .getService('api/Tweet/AllLatestNews')
            .subscribe(
            (result : Article[]) => {
                if (result) {
                    this.sourceList = _.uniq(_.map(result, 'source'));
                    this.sourceList.push('All');
                    this.sourceList.sort();
                    this.articleList = result;
                }
            },
            error => {
                console.log(<any>error);
            }
        );
    }

    get diagnostic(): string {
        return JSON.stringify("testing");
    }
}