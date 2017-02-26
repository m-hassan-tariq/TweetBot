import { Injectable } from '@angular/core';

import { WebApiObservableService } from './web-api-observable.service';
import { WebApiPromiseService } from './web-api-promise.service';

@Injectable()
export class TweetService {

    constructor(private webApiObservableService: WebApiObservableService) {

    }

    postNewsTweet(title: string, url: string) {
        let content: string = title.substring(0, 100) + ' - ' + url;
        console.log(content);
        this.webApiObservableService
            .getServiceWithFixedQueryString('api/Tweet/PostTweet', content)
            .subscribe(
            (result: any) => {
                console.log(result);
            },
            error => {
                console.log(<any>error);
            }
            );
    }

    postAllNewsTweet(sortBy: string) {
        let url: string = sortBy == 'latest' ? 'PostAllLatestNewsTweet' : 'PostAllTopNewsTweet'; 
        console.log(url);
        this.webApiObservableService
            .getService('api/Tweet/' + url)
            .subscribe(
            (result: any) => {
                console.log(result);
            },
            error => {
                console.log(<any>error);
            }
            );
    }

}