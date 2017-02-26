import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { TweetComponent } from './tweet/tweet.component';
import { LatestNewsComponent } from './news/latest-news.component';
import { TopNewsComponent } from './news/top-news.component';
import { BlogComponent } from './blog/blog.component';

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '',
                redirectTo: '/dashboard',
                pathMatch: 'full',
                data: { title: 'Dashboard' }
            },
            {
                path: 'dashboard',
                component: DashboardComponent,
                pathMatch: 'full',
                data: { title: 'Dashboard' }
            },
            {
                path: 'tweet',
                component: TweetComponent,
                pathMatch: 'full',
                data: { title: 'Tweet' }
            },
            {
                path: 'latest-news',
                component: LatestNewsComponent,
                pathMatch: 'full',
                data: { title: 'Latest News' }
            },
            {
                path: 'top-news',
                component: TopNewsComponent,
                pathMatch: 'full',
                data: { title: 'Top News' }
            },
            {
                path: 'blog',
                component: BlogComponent,
                pathMatch: 'full',
                data: { title: 'Blog' }
            }
        ])
    ],
    exports: [
        RouterModule
    ]
})

export class AppRoutingModule { }
    
