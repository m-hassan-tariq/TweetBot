"use strict";
var page_title_service_1 = require('./shared/service/page-title.service');
var alert_service_1 = require('./shared/service/alert.service');
var loader_service_1 = require('./shared/service/loader.service');
var web_api_observable_service_1 = require('./shared/service/web-api-observable.service');
var web_api_promise_service_1 = require('./shared/service/web-api-promise.service');
exports.APP_PROVIDERS = [
    page_title_service_1.PageTitleService,
    alert_service_1.AlertService,
    alert_service_1.ToasterService,
    loader_service_1.LoaderService,
    web_api_observable_service_1.WebApiObservableService,
    web_api_promise_service_1.WebApiPromiseService
];
//# sourceMappingURL=app.provider.js.map