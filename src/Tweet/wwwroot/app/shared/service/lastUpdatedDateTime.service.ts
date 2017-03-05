import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { WebApiObservableService } from './web-api-observable.service';
import { WebApiPromiseService } from './web-api-promise.service';

@Injectable()
export class LastUpdatedDateTimeService {

    public latestNewsUpdatedTime: BehaviorSubject<string> = new BehaviorSubject<string>("");
    public topNewsUpdatedTime: BehaviorSubject<string> = new BehaviorSubject<string>("");
    public lastTweetUpdatedTime: BehaviorSubject<string> = new BehaviorSubject<string>("");

    constructor(
        private webApiObservableService: WebApiObservableService) {

    }

    getUpdatedTime() {
        this.webApiObservableService
            .getService('api/Tweet/LastUpdatedDateTime')
            .subscribe(
            (result: string[]) => {
                console.log(result);
                this.lastTweetUpdatedTime.next(result[0]);
                this.latestNewsUpdatedTime.next(result[1]);
                this.topNewsUpdatedTime.next(result[2]);
            },
            error => {
                console.log(error);
            }
            );
    }
}