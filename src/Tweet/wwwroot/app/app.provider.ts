import { WebApiObservableService } from './shared/service/web-api-observable.service';
import { WebApiPromiseService } from './shared/service/web-api-promise.service';

export const APP_PROVIDERS = [
    WebApiObservableService,
    WebApiPromiseService
]