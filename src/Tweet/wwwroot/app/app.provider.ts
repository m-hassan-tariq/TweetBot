import { PageTitleService } from './shared/service/page-title.service';
import { AlertService, ToasterService } from './shared/service/alert.service';
import { LoaderService } from './shared/service/loader.service';
import { WebApiObservableService } from './shared/service/web-api-observable.service';
import { WebApiPromiseService } from './shared/service/web-api-promise.service';

export const APP_PROVIDERS = [
    PageTitleService,
    AlertService,
    ToasterService,
    LoaderService,
    WebApiObservableService,
    WebApiPromiseService
]