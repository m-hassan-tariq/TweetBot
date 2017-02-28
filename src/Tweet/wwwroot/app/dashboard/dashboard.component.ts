import { Component, OnInit } from '@angular/core';

import { Article } from '../shared/model/article';
import { TweetService } from '../shared/service/tweet.service';
import { LoaderService } from '../shared/service/loader.service';
import { WebApiObservableService } from '../shared/service/web-api-observable.service';
import { WebApiPromiseService } from '../shared/service/web-api-promise.service';
import { ToasterService } from '../shared/service/toaster.service';

@Component({
    selector: 'dashboard',
    templateUrl: './app/dashboard/dashboard.component.html'
})

export class DashboardComponent implements OnInit {
    lastestArticleList: Article[];
    topArticleList: Article[];
    topSecondaryArticleList: Article[];
    sourceList: string[];
    sourceName: string;

    constructor(
        private loaderService: LoaderService,
        private toasterService: ToasterService,
        private webApiObservableService: WebApiObservableService,
        private tweetService: TweetService) {
        this.lastestArticleList = [];
        this.topArticleList = [];
        this.topSecondaryArticleList = [];
        this.sourceList = [];
        this.sourceName = 'All';
    }

    ngOnInit() {
        this.getAllLatestNews();
    }

    getAllLatestNews() {
        this.lastestArticleList = [];
        this.sourceList = [];
        this.webApiObservableService
            .getService('api/Tweet/AllLatestNews')
            .subscribe(
            (result: Article[]) => {
                if (result) {
                    this.sourceList = result.map(item => item.source).filter((value, index, self) => self.indexOf(value) === index);
                    this.sourceList.push('All');
                    this.sourceList.sort();
                    this.lastestArticleList = result;
                    this.getAllTopNews();
                }
            },
            error => {
                this.loaderService.display(false);
                this.toasterService.showToaster(<any>error);
            }
            );
    }

    getAllTopNews() {
        this.topArticleList = [];
        this.webApiObservableService
            .getService('api/Tweet/AllTopNews')
            .subscribe(
            (result: Article[]) => {
                if (result) {
                    this.topArticleList = result;
                    this.getAllSecondaryTopNews();
                }
            },
            error => {
                this.loaderService.display(false);
                this.toasterService.showToaster(<any>error);
            }
            );
    }

    getAllSecondaryTopNews() {
        this.topSecondaryArticleList = [];
        this.webApiObservableService
            .getService('api/Tweet/AllSecondaryTopNews')
            .subscribe(
            (result: Article[]) => {
                if (result) {
                    this.topSecondaryArticleList = result;
                    this.loaderService.display(false);
                    this.toasterService.showToaster('Dashboard have been loaded');
                }
            },
            error => {
                this.loaderService.display(false);
                this.toasterService.showToaster(<any>error);
            }
            );
    }

    sendTweet(item: Article) {
        this.tweetService.postTweet(item.title, item.url);
    }

    tweetNewsBySource(sortBy: string, source: string) {
        this.tweetService.postNewsBySource(sortBy, source);
    }

    get diagnostic(): string {
        return JSON.stringify("testing");
    }
}