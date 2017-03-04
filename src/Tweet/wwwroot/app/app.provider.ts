import { WebApiObservableService } from './shared/service/web-api-observable.service';
import { WebApiPromiseService } from './shared/service/web-api-promise.service';
import { TweetService } from './shared/service/tweet.service';
import { ToasterService } from './shared/service/toaster.service';
import { LoaderService } from './shared/service/loader.service';
import { TwitterTimelineService } from './shared/service/twitter-timeline.service';

import { DashboardComponent } from './dashboard/dashboard.component';
import { TweetComponent } from './tweet/tweet.component';
import { ProfileComponent } from './profile/profile.component';
import { LatestNewsComponent } from './news/latest-news.component';
import { TopNewsComponent } from './news/top-news.component';
import { BlogComponent } from './blog/blog.component';

import { SearchFilterPipe } from './shared/service/searchfilter.pipe';
import { SortGridPipe } from './shared/service/sortgrid.pipe';

export const All_Services = [
    WebApiObservableService,
    WebApiPromiseService,
    TweetService,
    ToasterService,
    LoaderService,
    TwitterTimelineService
]

export const All_Components = [
    DashboardComponent,
    ProfileComponent,
    TweetComponent,
    LatestNewsComponent,
    TopNewsComponent,
    BlogComponent,
]

export const All_Filters = [
    SearchFilterPipe,
    SortGridPipe
]