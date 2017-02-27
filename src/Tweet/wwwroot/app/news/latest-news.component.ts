import { Component, OnInit } from '@angular/core';

import { Article } from '../shared/model/article';
import { TweetService } from '../shared/service/tweet.service';
import { LoaderService } from '../shared/service/loader.service';
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
    selectAllStatus: boolean;

    constructor(
        private loaderService: LoaderService,
        private toasterService: ToasterService,
        private webApiObservableService: WebApiObservableService,
        private tweetService: TweetService) {
        this.articleList = [];
        this.sourceList = [];
        this.sourceName = 'All';
        this.selectAllStatus = false;
    }

    ngOnInit() {
        this.getAllTestNews();
    }

    getAllTestNews() {
        this.articleList = [];
        this.sourceList = [];
        this.webApiObservableService
            .getService('api/Tweet/AllLatestNews')
            .subscribe(
            (result: Article[]) => {
                if (result) {
                    this.sourceList =
                        result
                            .map(item => item.source)
                            .filter((value, index, self) => self.indexOf(value) === index);
                    this.sourceList.push('All');
                    this.sourceList.sort();
                    this.articleList = result;
                    this.loaderService.display(false);
                    this.toasterService.showToaster('Latest News have been loaded');
                }
            },
            error => {
                this.loaderService.display(false);
                this.toasterService.showToaster(<any>error);
            }
            );
    }

    selectAll() {
        console.log('hassan');
        this.articleList.forEach((v, i) => {
            v.selected = this.selectAllStatus;
        });
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