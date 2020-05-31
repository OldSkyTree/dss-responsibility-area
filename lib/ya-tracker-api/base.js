'use strict';

const got = require('got');
const url = require('url');

const trackerConfig = require('../../.config/tracker');

module.exports = class BaseEntity {
    constructor() {
        this._config = trackerConfig;
        this._prefix = '';
    }

    _getBaseUrl() {
        return url.resolve(this._config.hostname, this._prefix);
    }

    _getHeaders() {
        return {
            'Authorization': `OAuth ${this._config.token}`,
            'X-Org-Id': this._config.orgId
        }
    }

    async _makeRequest(method, partialUrl, data) {
        const fullUrl = url.resolve(this._getBaseUrl(), partialUrl);
        const response = await got[method](fullUrl, {
            json: data,
            headers: this._getHeaders()
        }).json();

        return response;
    }

    async _makeGetRequest(url, data) {
        return this._makeRequest('get', url, data);
    }
}
