import { Component, OnInit, AfterViewChecked, AfterViewInit, AfterContentInit } from '@angular/core';

@Component({
    selector: 'my-app',
    templateUrl: './app/app.component.html'
})

export class AppComponent implements OnInit, AfterViewChecked, AfterViewInit, AfterContentInit {
    header: string;
    objLoaderStatus: boolean;

    constructor() {
        this.objLoaderStatus = false;
    }

    ngOnInit() {

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