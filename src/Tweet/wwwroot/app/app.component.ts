import { Component, OnInit, AfterViewChecked, AfterViewInit, AfterContentInit } from '@angular/core';
import { Router, ActivatedRoute, Params, NavigationEnd } from '@angular/router';

@Component({
    selector: 'my-app',
    templateUrl: './app/app.component.html'
})

export class AppComponent implements OnInit, AfterViewChecked, AfterViewInit, AfterContentInit {
    pageTitle: string;

    constructor(private router: Router,
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