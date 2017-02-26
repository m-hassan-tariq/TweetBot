import { Component, OnInit } from '@angular/core';

import { WebApiObservableService } from '../shared/service/web-api-observable.service';
import { WebApiPromiseService } from '../shared/service/web-api-promise.service';

@Component({
    selector: 'blog',
    templateUrl: './app/blog/blog.component.html'
})

export class BlogComponent implements OnInit {

    constructor(
        private webApiObservableService: WebApiObservableService) {
    }

    ngOnInit() {
    }

    get diagnostic(): string {
        return JSON.stringify("testing");
    }
}