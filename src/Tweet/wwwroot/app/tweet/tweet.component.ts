import { Component, OnInit, Input, AfterViewInit, ElementRef } from '@angular/core';

import { WebApiObservableService } from '../shared/service/web-api-observable.service';
import { WebApiPromiseService } from '../shared/service/web-api-promise.service';
import { TwitterTimelineService } from '../shared/service/twitter-timeline.service';
import { TweetService } from '../shared/service/tweet.service';
import { ToasterService } from '../shared/service/toaster.service';

@Component({
    selector: 'tweet',
    templateUrl: './app/tweet/tweet.component.html'
})

export class TweetComponent implements OnInit, AfterViewInit {

    title: string;
    url: string;

    //@Input() tweetId: string;

    constructor(
        //private element: ElementRef,
        private tweetService: TweetService,
        private toasterService: ToasterService,
        private webApiObservableService: WebApiObservableService,
        private twitterTimelineService: TwitterTimelineService) {
        this.title = '';
        this.url = '';
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
        this.twitterTimelineService.loadTimeLineWidget();
    }

    //ngAfterViewInit() {
    //    //MAKE SURE TWITTER WIDGET SCRIPT IS LOADED IN HEAD...
    //    console.log('Created tweet widget: ');
    //    this.twitterTimelineService.LoadScript().subscribe
    //        ( //SUCCESS, WE HAVE TWITTER WIDGETS JS FILE LOADED...
    //        twttr => {
    //            let nativeElement = this.element.nativeElement;
    //            //console.log(nativeElement);
    //            window['twttr'].widgets.createTweet(this.tweetId, nativeElement, {}).then
    //                (function success(embed) {
    //                    console.log('Created tweet widget: ', embed);
    //                }).catch
    //                (function creationError(message) {
    //                    console.log('Could not create widget: ', message);
    //                });
    //        },

    //        //ERROR
    //        err => {
    //            console.log('****  ERROR LOADING TWITTER WIDGET', err);
    //        },

    //        //COMPLETE
    //        () => {});
    //}

    //private onTwitterLoaded(twttr) {
    //    console.log('TWITTER LOADED YO', twttr);
    //};

    sendTweet() {
        if (this.title) {
            this.tweetService.postTweet(this.title, this.url);
        }
        else{
            this.toasterService.showToaster('enter title please!!');
        }
    }

    refreshPage() {
        window.location.reload();
    }

    get diagnostic(): string {
        return JSON.stringify("testing");
    }
}