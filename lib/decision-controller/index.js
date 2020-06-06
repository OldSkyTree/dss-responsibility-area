'use strict';

const _ = require('lodash');

const { INITIAL_MODELS } = require('./constants');
const { compareRequests } = require('./requests-comparsion');
const { requests } = require('../mongo-db');

const makeDecision = async (currentRequest) => {
    const allRequests = INITIAL_MODELS.concat(await requests.findAll());
    const requestsComparsionValues = allRequests.map((request) =>({
        request,
        comparsionValue: compareRequests(request.questions, currentRequest.questions)
    }));

    return _(requestsComparsionValues)
        .maxBy('comparsionValue')
        .get('request.resolution');
};

module.exports = {
    makeDecision
};
