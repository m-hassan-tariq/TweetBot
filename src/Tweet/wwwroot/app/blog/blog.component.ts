import { Component, OnInit } from '@angular/core';

import { Blog } from '../shared/model/blog';
import { TweetService } from '../shared/service/tweet.service';
import { LoaderService } from '../shared/service/loader.service';
import { WebApiObservableService } from '../shared/service/web-api-observable.service';
import { WebApiPromiseService } from '../shared/service/web-api-promise.service';
import { ToasterService } from '../shared/service/toaster.service';
//import * as _ from "lodash";

@Component({
    selector: 'blog',
    templateUrl: './app/blog/blog.component.html'
})

export class BlogComponent implements OnInit {
    blogList: Blog[];
    selectedBlogList: Blog[];
    categoryList: string[];
    categoryName: string;
    selectAllFlag: boolean;
    selectCounter: number;

    constructor(
        private loaderService: LoaderService,
        private toasterService: ToasterService,
        private webApiObservableService: WebApiObservableService,
        private tweetService: TweetService) {
        this.blogList = [];
        this.selectedBlogList = [];
        this.categoryList = [];
        this.categoryName = 'All';
        this.selectAllFlag = false;
        this.selectCounter = 0;
    }

    ngOnInit() {
        this.getAllBlogPosts();
    }

    getAllBlogPosts() {
        this.blogList = [];
        this.categoryList = [];
        this.webApiObservableService
            .getService('api/Tweet/AllLatestNews')
            .subscribe(
            (result: Blog[]) => {
                if (result) {
                    this.categoryList = result.map(item => item.category).filter((value, index, self) => self.indexOf(value) === index);
                    this.categoryList.push('All');
                    this.categoryList.sort();
                    this.resetGrid(result);
                    this.blogList = result;
                    this.loaderService.display(false);
                    this.toasterService.showToaster('Blog posts have been loaded');
                }
            },
            error => {
                this.loaderService.display(false);
                this.toasterService.showToaster(<any>error);
            }
            );
    }

    filterGridByCategory(category: string) {
        this.categoryName = category;
        this.resetGrid(this.blogList);
    }

    selectAll() {
        this.selectCounter = 0;
        this.selectAllFlag = !this.selectAllFlag;

        this.blogList.forEach((v, i) => {
            if (v.category == this.categoryName || this.categoryName == 'All') {
                this.selectCounter = this.selectAllFlag == true ? this.selectCounter + 1 : 0;
                v.selected = this.selectAllFlag;
            }
            else {
                v.selected = !this.selectAllFlag;
            }
        });
    }

    selectOneItem(item: Blog) {
        item.selected = !item.selected;
        if (item.selected == true) {
            this.selectCounter = this.selectCounter + 1
        } else {
            this.selectCounter = this.selectCounter - 1;
            this.selectAllFlag = false;
        };
    }

    sendTweet(item: Blog) {
        this.tweetService.postNewsTweet(item.header, item.url);
    }

    sendAllTweet() {
        this.tweetService.postAllBlogTweet();
    }

    sendSelectedTweet() {
        this.selectedBlogList = [];
        this.blogList.forEach((v, i) => {
            if (v.selected == true) {
                this.selectedBlogList.push(this.blogList[i]);
                v.selected = false;
            }
        });

        if (this.selectedBlogList.length > 0) {
            this.tweetService.postSelectedNewsTweet(this.selectedBlogList);
            this.resetGrid(this.blogList);
        }
    }

    resetGrid(result: Blog[]) {
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