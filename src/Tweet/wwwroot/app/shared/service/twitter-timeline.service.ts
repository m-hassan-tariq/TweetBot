import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class TwitterTimelineService {

    readonly TWITTER_SCRIPT_ID = 'twitter-wjs';
    readonly TWITTER_WIDGET_URL = 'https://platform.twitter.com/widgets.js';

    constructor() {
    }

    LoadScript(): Observable<any> {
        let that = this;

        return Observable.create(observer => {
            //START LOADING SCRIPT INTO DOM
            that.startScriptLoad();
            console.log(window['twttr']);
            //WHEN TWITTER WIDGETS SCRIPT IS LOADED, THEN PASS ALONG....
            window['twttr'].ready
                (
                    function onLoadTwitterScript(twttr) {
                        console.log(twttr);
                        observer.next(twttr);
                        observer.complete();
                    }
                );
        });
    };

    private startScriptLoad() {
        window['twttr'] = (function (d, s, id, url) {
            var js,
                fjs = d.getElementsByTagName(s)[0],
                t = window['twttr'] || {};

            if (d.getElementById(id)) return t;

            js = d.createElement(s);
            js.id = id;
            js.src = url;
            fjs.parentNode.insertBefore(js, fjs);

            t._e = [];

            t.ready = function (f) {
                t._e.push(f);
            };

            return t;
        } (document, "script", this.TWITTER_SCRIPT_ID, this.TWITTER_WIDGET_URL));
    }

    loadTimeLineWidget() {
        !function (d, s, id) {
            var js: any,
                fjs = d.getElementsByTagName(s)[0],
                p = 'https';
            if (!d.getElementById(id)) {
                js = d.createElement(s);
                js.id = id;
                js.src = p + "://platform.twitter.com/widgets.js";
                fjs.parentNode.insertBefore(js, fjs);
            }
        }
            (document, "script", "twitter-wjs");
    }
}