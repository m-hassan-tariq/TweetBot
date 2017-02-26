import { Injectable } from '@angular/core';

import { WebApiObservableService } from './web-api-observable.service';
import { WebApiPromiseService } from './web-api-promise.service';
import { ToasterService } from './toaster.service';

@Injectable()
export class TweetService {

    constructor(private toasterService: ToasterService,
        private webApiObservableService: WebApiObservableService) {

    }

    postNewsTweet(title: string, url: string) {
        let content: string = title.substring(0, 100) + ' ' + url;
        this.webApiObservableService
            .getServiceWithFixedQueryString('api/Tweet/PostTweet', content)
            .subscribe(
            (result: any) => {
                this.toasterService.showToaster("Post with title: " + title + " is tweeted");
            },
            error => {
                this.toasterService.showToaster(<any>error);
            }
            );
    }

    postAllNewsTweet(sortBy: string) {
        let url: string = sortBy == 'latest' ? 'TweetAllLatestNews' : 'TweetAllTopNews'; 
        console.log(url);
        this.webApiObservableService
            .getService('api/Tweet/' + url)
            .subscribe(
            (result: any) => {
                this.toasterService.showToaster("All latest news posts are tweeted");
            },
            error => {
                this.toasterService.showToaster(<any>error);
            }
            );
    }

}