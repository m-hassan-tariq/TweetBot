import { Injectable } from '@angular/core';

import { BlogPost } from '../model/blogpost';
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

    postContent(text: string) {
        let content: string = text.substring(0, 140);
        this.webApiObservableService
            .getServiceWithFixedQueryString('api/Tweet/PostTweet', content)
            .subscribe(
            (result: any) => {
                this.loaderService.display(false);
                this.toasterService.showToaster("Content is tweeted");
            },
            error => {
                this.handleError(error);
            }
            );
    }

    postTweet(title: string, url: string) {
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

    postNewsBySource(sortBy: string, source: string) {
        let url: string = sortBy == 'latest' ? 'PostLatestNews' : 'PostTopNews';
        this.webApiObservableService
            .getServiceWithDynamicQueryTerm('api/Tweet/' + url, 'source', source)
            .subscribe(
            (result: any) => {
                this.loaderService.display(false);
                this.toasterService.showToaster("All news posts of " + source + "have been tweeted");
            },
            error => {
                this.handleError(error);
            }
            );
    }

    postAllNewsTweet(sortBy: string) {
        let url: string = sortBy == 'latest' ? 'PostAllLatestNews' : 'PostAllTopNews';
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
            .createService('api/Tweet/PostSelectedNews', articleList)
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
            .getService('api/Tweet/PostAllBlog')
            .subscribe(
            (result: any) => {
                this.loaderService.display(false);
                this.toasterService.showToaster("All blog posts are tweeted");
            },
            error => {
                this.handleError(error);
            }
            );
    }

    postBlogByCategoryTweet(category: string) {
        this.webApiObservableService
            .getServiceWithDynamicQueryTerm('api/Tweet/PostBlogByCategory', 'category', category)
            .subscribe(
            (result: any) => {
                this.loaderService.display(false);
                this.toasterService.showToaster("All blog posts of " + category + " are tweeted");
            },
            error => {
                this.handleError(error);
            }
            );
    }

    postSelectedBlogTweet(blogList: BlogPost[]) {
        this.webApiObservableService
            .createService('api/Tweet/PostSelectedBlog', blogList)
            .subscribe(
            (result: any) => {
                this.loaderService.display(false);
                this.toasterService.showToaster("All selected blog posts have been tweeted");
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