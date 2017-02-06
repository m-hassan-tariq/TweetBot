import { Component, OnInit } from '@angular/core';

import { AlertService, AlertMessage, ToasterService } from '../shared/service/alert.service';
import { PageTitleService } from '../shared/service/page-title.service';
import { LoaderService } from '../shared/service/loader.service';

import { NewsModel } from './shared/model/news.model'
import { WebApiObservableService } from '../shared/service/web-api-observable.service';
import { WebApiPromiseService } from '../shared/service/web-api-promise.service';

@Component({
    selector: 'search-movie-list',
    templateUrl: './app/dashboard/dashboard.component.html',
    styleUrls: ['./app/dashboard/dashboard.component.css']
})

export class DashboardComponent implements OnInit {
    newsList: NewsModel[];

    constructor(
        private pageTitleService: PageTitleService,
        private alertService: AlertService,
        private toasterService: ToasterService,
        private loaderService: LoaderService,
        private webApiObservableService: WebApiObservableService) {
        this.newsList = [];
    }

    ngOnInit() {
        this.pageTitleService.setTitle("Dashboard");
        this.alertService.showAlert(true, "Welcome User - Dashboard has been loaded");
        this.populateNewsData();
    }

    populateNewsData() {
        this.loaderService.displayLoader(true);
    }

    displaySource(source: string) {
        this.toasterService.showToaster('success', 'Source of the news is ...', source);
    }

    get diagnostic() : string {
        return JSON.stringify(this.newsList);
    }
}