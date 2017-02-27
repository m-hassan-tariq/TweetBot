"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var Observable_1 = require('rxjs/Observable');
var toaster_service_1 = require('./toaster.service');
var loader_service_1 = require('./loader.service');
// Observable class extensions
require('rxjs/add/observable/of');
require('rxjs/add/observable/throw');
// Observable operators
require('rxjs/add/operator/catch');
require('rxjs/add/operator/debounceTime');
require('rxjs/add/operator/distinctUntilChanged');
require('rxjs/add/operator/do');
require('rxjs/add/operator/filter');
require('rxjs/add/operator/map');
require('rxjs/add/operator/switchMap');
var WebApiObservableService = (function () {
    function WebApiObservableService(http, loaderService, toasterService) {
        this.http = http;
        this.loaderService = loaderService;
        this.toasterService = toasterService;
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json', 'Accept': 'q=0.8;application/json;q=0.9' });
        this.options = new http_1.RequestOptions({ headers: this.headers });
    }
    WebApiObservableService.prototype.getService = function (url) {
        this.loaderService.display(true);
        return this.http
            .get(url, this.options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    WebApiObservableService.prototype.getServiceWithDynamicQueryTerm = function (url, key, val) {
        this.loaderService.display(true);
        return this.http
            .get(url + "/?" + key + "=" + val, this.options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    WebApiObservableService.prototype.getServiceWithFixedQueryString = function (url, param) {
        this.loaderService.display(true);
        this.options = new http_1.RequestOptions({ headers: this.headers, search: 'content=' + param });
        return this.http
            .get(url, this.options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    WebApiObservableService.prototype.getServiceWithComplexObjectAsQueryString = function (url, param) {
        this.loaderService.display(true);
        var params = new http_1.URLSearchParams();
        for (var key in param) {
            if (param.hasOwnProperty(key)) {
                var val = param[key];
                params.set(key, val);
            }
        }
        this.options = new http_1.RequestOptions({ headers: this.headers, search: params });
        return this.http
            .get(url, this.options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    WebApiObservableService.prototype.createService = function (url, param) {
        this.loaderService.display(true);
        var body = JSON.stringify(param);
        console.log(body);
        return this.http
            .post(url, body, this.options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    WebApiObservableService.prototype.updateService = function (url, param) {
        this.loaderService.display(true);
        var body = JSON.stringify(param);
        return this.http
            .put(url, body, this.options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    WebApiObservableService.prototype.patchService = function (url, param) {
        this.loaderService.display(true);
        var body = JSON.stringify(param);
        return this.http
            .patch(url, body, this.options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    WebApiObservableService.prototype.deleteService = function (url, param) {
        this.loaderService.display(true);
        var params = new http_1.URLSearchParams();
        for (var key in param) {
            if (param.hasOwnProperty(key)) {
                var val = param[key];
                params.set(key, val);
            }
        }
        this.options = new http_1.RequestOptions({ headers: this.headers, search: params });
        return this.http
            .delete(url, this.options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    WebApiObservableService.prototype.deleteServiceWithId = function (url, key, val) {
        this.loaderService.display(true);
        return this.http
            .delete(url + "/?" + key + "=" + val, this.options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    WebApiObservableService.prototype.extractData = function (res) {
        var body = res.json();
        return body || {};
    };
    WebApiObservableService.prototype.handleError = function (error) {
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Server error';
        return Observable_1.Observable.throw(errMsg);
    };
    WebApiObservableService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, loader_service_1.LoaderService, toaster_service_1.ToasterService])
    ], WebApiObservableService);
    return WebApiObservableService;
}());
exports.WebApiObservableService = WebApiObservableService;
//# sourceMappingURL=web-api-observable.service.js.map