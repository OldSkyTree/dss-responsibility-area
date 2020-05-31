'use strict';

const Issues = require('./issues');

module.exports = class Client {
    constructor() {
        this.issues = new Issues();
    }
}
