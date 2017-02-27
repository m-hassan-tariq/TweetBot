import { Component, OnInit, AfterViewChecked, AfterViewInit, AfterContentInit } from '@angular/core';
import { Router, ActivatedRoute, Params, NavigationEnd } from '@angular/router';

import { LoaderService } from './shared/service/loader.service';

@Component({
    selector: 'my-app',
    templateUrl: './app/app.component.html',
    styleUrls: ['./app/app.component.css']
})

export class AppComponent implements OnInit, AfterViewChecked, AfterViewInit, AfterContentInit {
    pageTitle: string;
    showLoader: boolean;

    constructor(
        private loaderService: LoaderService,
        private router: Router,
        private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.router.events
            .filter((event: any) => event instanceof NavigationEnd)
            .subscribe(() => {
                var root = this.router.routerState.snapshot.root;
                while (root) {
                    if (root.children && root.children.length) {
                        root = root.children[0];
                    } else if (root.data && root.data["title"]) {
                        this.pageTitle = root.data["title"];
                        return;
                    } else {
                        return;
                    }
                }
            });

        this.loaderService.status.subscribe((val: boolean) => {
            this.showLoader = val;
        });
    }

    onCloseAlert(reason: string) {
    }

    ngAfterViewChecked() {
    }

    ngAfterContentInit() {
    }

    ngAfterViewInit() {
    }

}