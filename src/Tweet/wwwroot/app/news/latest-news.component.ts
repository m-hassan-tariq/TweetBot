import { Component, OnInit } from '@angular/core';

import { Article } from '../shared/model/article';
import { TweetService } from '../shared/service/tweet.service';
import { WebApiObservableService } from '../shared/service/web-api-observable.service';
import { WebApiPromiseService } from '../shared/service/web-api-promise.service';
import { ToasterService } from '../shared/service/toaster.service';
//import * as _ from "lodash";

@Component({
    selector: 'latest-news',
    templateUrl: './app/news/latest-news.component.html'
})

export class LatestNewsComponent implements OnInit {
    articleList: Article[];
    sourceList: string[];
    sourceName: string;

    constructor(
        private toasterService: ToasterService,
        private webApiObservableService: WebApiObservableService,
        private tweetService: TweetService) {
        this.sourceList = [];
        this.sourceName = 'All';

    }

    ngOnInit() {
        this.webApiObservableService
            .getService('api/Tweet/AllLatestNews')
            .subscribe(
            (result : Article[]) => {
                if (result) {
                    this.sourceList = result.map(item => item.source)
                        .filter((value, index, self) => self.indexOf(value) === index);
                    this.sourceList.push('All');
                    this.sourceList.sort();
                    this.articleList = result;
                    this.toasterService.showToaster('Latest News have been loaded');
                }
            },
            error => {
                console.log(<any>error);
            }
        );
    }

    sendTweet(item: Article) {
        this.tweetService.postNewsTweet(item.title, item.url);
    }

    sendAllTweet() {
        this.tweetService.postAllNewsTweet('latest');
    }

    get diagnostic(): string {
        return JSON.stringify("testing");
    }
}