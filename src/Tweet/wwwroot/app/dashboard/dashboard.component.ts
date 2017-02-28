import { Component, OnInit } from '@angular/core';

import { Article } from '../shared/model/article';
import { BlogPost } from '../shared/model/blogpost';
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
    blogList: BlogPost[];
    categoryList: string[];
    sourceList: string[];
    secondarySourceList: string[];
    newsTypeList: string[];
    categoryValue: string;
    sourceValue: string;
    newsTypeValue: string;
    content: string;

    constructor(
        private loaderService: LoaderService,
        private toasterService: ToasterService,
        private webApiObservableService: WebApiObservableService,
        private tweetService: TweetService) {
        this.lastestArticleList = [];
        this.topArticleList = [];
        this.topSecondaryArticleList = [];
        this.sourceList = [];
        this.secondarySourceList = [];
        this.blogList = [];
        this.categoryList = [];
        this.newsTypeList = ['top', 'latest'];
        this.categoryValue = '';
        this.sourceValue = '';
        this.newsTypeValue = '';
        this.content = '';
    }

    ngOnInit() {
        this.getAllBlogPosts();
    }

    getAllBlogPosts() {
        this.blogList = [];
        this.categoryList = [];
        this.webApiObservableService
            .getService('api/Tweet/AllBlog')
            .subscribe(
            (result: BlogPost[]) => {
                if (result) {
                    this.categoryList = result.map(item => item.category).filter((value, index, self) => self.indexOf(value) === index).sort();
                    //this.categoryValue = this.categoryList ? this.categoryList[0] : '';
                    this.blogList = result;
                    this.getAllLatestNews();
                }
            },
            error => {
                this.loaderService.display(false);
                this.toasterService.showToaster(<any>error);
            }
            );
    }

    getAllLatestNews() {
        this.lastestArticleList = [];
        this.sourceList = [];
        this.webApiObservableService
            .getService('api/Tweet/AllLatestNews')
            .subscribe(
            (result: Article[]) => {
                if (result) {
                    this.sourceList = result.map(item => item.source).filter((value, index, self) => self.indexOf(value) === index).sort();
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
                    this.secondarySourceList = result.map(item => item.source).filter((value, index, self) => self.indexOf(value) === index).sort();
                    this.sourceList = this.sourceList.concat(this.secondarySourceList).sort();
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

    sendContent() {
        if (this.content) {
            this.tweetService.postContent(this.content);
            this.content = '';
        }
        else {
            this.toasterService.showToaster('Content is missing!!');
        }
    }

    sendTweet(item: Article) {
        this.tweetService.postTweet(item.title, item.url);
    }

    tweetNewsBySource(sortBy: string, source: string) {
        if (sortBy && source) {
            this.tweetService.postNewsBySource(sortBy, source);
            this.sourceValue = '';
            this.newsTypeValue = '';
        }
        else {
            this.toasterService.showToaster('News type or Source is missing!!');
        }
    }

    tweetAllNews(sortBy: string) {
        this.tweetService.postAllNewsTweet(sortBy);
    }

    tweetAllBlogPosts() {
        this.tweetService.postAllBlogTweet();
    }

    tweetAllBlogPostsByCategory() {
        if (this.categoryValue) {
            this.tweetService.postBlogByCategoryTweet(this.categoryValue);
            this.categoryValue = '';
        }
        else {
            this.toasterService.showToaster('Choose blog posts category!!');
        }
    }

    get diagnostic(): string {
        return JSON.stringify("testing");
    }
}