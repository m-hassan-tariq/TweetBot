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
    selectedArticleList: Article[];
    sourceList: string[];
    sourceName: string;
    selectAllFlag: boolean;
    selectCounter: number;

    constructor(
        private loaderService: LoaderService,
        private toasterService: ToasterService,
        private webApiObservableService: WebApiObservableService,
        private tweetService: TweetService) {
        this.articleList = [];
        this.selectedArticleList = [];
        this.sourceList = [];
        this.sourceName = 'All';
        this.selectAllFlag = false;
        this.selectCounter = 0;
    }

    ngOnInit() {
        this.getAllLatestNews();
    }

    getAllLatestNews() {
        this.articleList = [];
        this.sourceList = [];
        this.webApiObservableService
            .getService('api/Tweet/AllLatestNews')
            .subscribe(
            (result: Article[]) => {
                if (result) {
                    this.sourceList = result.map(item => item.source).filter((value, index, self) => self.indexOf(value) === index);
                    this.sourceList.push('All');
                    this.sourceList.sort();
                    this.resetGrid(result);
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

    filterGridBySource(source: string) {
        this.sourceName = source;
        this.resetGrid(this.articleList);
    }

    selectAll() {
        this.selectCounter = 0;
        this.selectAllFlag = !this.selectAllFlag;

        this.articleList.forEach((v, i) => {
            if (v.source == this.sourceName || this.sourceName == 'All') {
                this.selectCounter = this.selectAllFlag == true ? this.selectCounter + 1 : 0;
                v.selected = this.selectAllFlag;
            }
            else {
                v.selected = !this.selectAllFlag;
            }
        });
    }

    selectOneItem(item: Article) {
        item.selected = !item.selected;
        if (item.selected == true) {
            this.selectCounter = this.selectCounter + 1
        } else {
            this.selectCounter = this.selectCounter - 1;
            this.selectAllFlag = false;
        };
    }

    sendTweet(item: Article) {
        this.tweetService.postTweet(item.title, item.url);
    }

    sendAllTweet() {
        this.tweetService.postAllNewsTweet('latest');
    }

    sendSelectedTweet() {
        this.selectedArticleList = [];
        this.articleList.forEach((v, i) => {
            if (v.selected == true) {
                this.selectedArticleList.push(this.articleList[i]);
                v.selected = false;
            }
        });

        if (this.selectedArticleList.length > 0) {
            this.tweetService.postSelectedNewsTweet(this.selectedArticleList);
            this.resetGrid(this.articleList);
        }
    }

    resetGrid(result: Article[]) {
        this.selectCounter = 0;
        this.selectAllFlag = false;
        result.forEach((v, i) => {
            v.selected = false;
        });
    }

    get diagnostic(): string {
        return JSON.stringify("testing");
    }
}