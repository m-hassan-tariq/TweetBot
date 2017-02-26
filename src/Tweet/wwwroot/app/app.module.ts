import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';

import { MaterialModule } from '@angular/material';
import 'node_modules/hammerjs/hammer.js';

import { DashboardComponent } from './dashboard/dashboard.component';
import { TweetComponent } from './tweet/tweet.component';
import { LatestNewsComponent } from './news/latest-news.component';
import { TopNewsComponent } from './news/top-news.component';
import { BlogComponent } from './blog/blog.component';
import { AppComponent } from './app.component';
import { AppRoutingModule  } from './app.routing';
import { APP_PROVIDERS } from './app.provider';

@NgModule({
    imports: [
        //angular builtin module
        BrowserModule,
        HttpModule,

        //ui module
        MaterialModule.forRoot(),

        //application feature module
        AppRoutingModule 
    ],
    declarations: [
        AppComponent,
        DashboardComponent,
        TweetComponent,
        LatestNewsComponent,
        TopNewsComponent,
        BlogComponent
    ],
    providers: [
        APP_PROVIDERS
    ],
    bootstrap: [
        AppComponent
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ]
})

export class AppModule {
}

