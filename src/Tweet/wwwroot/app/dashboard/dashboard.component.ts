﻿import { Component, OnInit } from '@angular/core';

import { WebApiObservableService } from '../shared/service/web-api-observable.service';
import { WebApiPromiseService } from '../shared/service/web-api-promise.service';

@Component({
    selector: 'dashboard',
    templateUrl: './app/dashboard/dashboard.component.html'
})

export class DashboardComponent implements OnInit {

    constructor(
        private webApiObservableService: WebApiObservableService) {
    }

    ngOnInit() {
    }

    get diagnostic(): string {
        return JSON.stringify("testing");
    }
}