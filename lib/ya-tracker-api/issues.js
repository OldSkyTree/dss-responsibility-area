'use strict';

const BaseEntity = require('./base');

module.exports = class Issues extends BaseEntity {
    constructor() {
        super();
        this._prefix = 'issues/';
    }

    async getIssue(issueId) {
        return this._makeRequest('get', `${issueId}`);
    }

    async modifyIssue(issueId, fields) {
        return this._makeRequest('patch', `${issueId}`, fields);
    }

    async createIssue(fields) {
        return this._makeRequest('post', '', fields);
    }

    async getIssueComments(issueId) {
        return this._makeRequest('get', `${issueId}/comments`);
    }

    async getIssueCount(filter) {
        return this._makeRequest('post', '_count', filter);
    }

    async findIssues(filter) {
        return this._makeRequest('post', '_search', filter);
    }

    async getIssueLinks(issueId) {
        return this._makeRequest('get', `${issueId}/links`);
    }

    async linkIssues(issueId, relations) {
        return this._makeRequest('post', `${issueId}/links`, relations);
    }

    async getIssueTransitions(issueId) {
        return this._makeRequest('get', `${issueId}/transitions`);
    }

    async makeIssueTransition(issueId, transitionId, fields) {
        return this._makeRequest('post', `${issueId}/transitions/${transitionId}/_execute`, fields);
    }

    async getIssueChangelog(issueId) {
        return this._makeRequest('get', `${issueId}/changelog`);
    }
}
