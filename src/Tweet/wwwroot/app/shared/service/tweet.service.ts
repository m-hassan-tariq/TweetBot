import { Injectable } from '@angular/core';

import { Article } from '../model/article';
import { LoaderService } from './loader.service';
import { WebApiObservableService } from './web-api-observable.service';
import { WebApiPromiseService } from './web-api-promise.service';
import { ToasterService } from './toaster.service';

@Injectable()
export class TweetService {

    constructor(
        private loaderService: LoaderService,
        private toasterService: ToasterService,
        private webApiObservableService: WebApiObservableService) {

    }

    postNewsTweet(title: string, url: string) {
        let content: string = title.substring(0, 100) + ' ' + url;
        this.webApiObservableService
            .getServiceWithFixedQueryString('api/Tweet/PostTweet', content)
            .subscribe(
            (result: any) => {
                this.loaderService.display(false);
                this.toasterService.showToaster("Post with title: " + title + " is tweeted");
            },
            error => {
                this.handleError(error);
            }
            );
    }

    postAllNewsTweet(sortBy: string) {
        let url: string = sortBy == 'latest' ? 'TweetAllLatestNews' : 'TweetAllTopNews'; 
        this.webApiObservableService
            .getService('api/Tweet/' + url)
            .subscribe(
            (result: any) => {
                this.loaderService.display(false);
                this.toasterService.showToaster("All " + sortBy + " news posts have been tweeted");
            },
            error => {
                this.handleError(error);
            }
            );
    }

    postSelectedNewsTweet(articleList: Article[]) {
        this.webApiObservableService
            .createService('api/Tweet/PostSelectedTweets', articleList)
            .subscribe(
            (result: any) => {
                this.loaderService.display(false);
                this.toasterService.showToaster("All selected news posts have been tweeted");
            },
            error => {
                this.handleError(error);
            }
            );
    }

    postAllBlogTweet() {
        this.webApiObservableService
            .getService('api/Tweet/TweetAllPost')
            .subscribe(
            (result: any) => {
                this.loaderService.display(false);
                this.toasterService.showToaster("All latest news posts are tweeted");
            },
            error => {
                this.handleError(error);
            }
            );
    }

    handleError(error) {
        this.toasterService.showToaster(<any>error);
        this.loaderService.display(false);
    }

}