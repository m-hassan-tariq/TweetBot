import { Component, OnInit } from '@angular/core';
import { MdDialog } from '@angular/material';

import { NewsModel } from './shared/model/news.model'
import { WebApiObservableService } from '../shared/service/web-api-observable.service';
import { WebApiPromiseService } from '../shared/service/web-api-promise.service';

@Component({
    selector: 'search-movie-list',
    templateUrl: './app/dashboard/dashboard.component.html',
    styleUrls: ['./app/dashboard/dashboard.component.css']
})

export class DashboardComponent implements OnInit {

    constructor(
        private webApiObservableService: WebApiObservableService,
        public dialog: MdDialog) {
    }

    openDialog() {
        let dialogRef = this.dialog.open(DialogResultExampleDialog);
    }

    ngOnInit() {
    }

    get diagnostic(): string {
        return JSON.stringify("testing");
    }
}

@Component({
    selector: 'dialog-result-example-dialog',
    template: 'Testing',
})
export class DialogResultExampleDialog {
}