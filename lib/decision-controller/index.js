'use strict';

const _ = require('lodash');

const { INITIAL_MODELS, TEAMS } = require('./constants');
const { compareRequests } = require('./requests-comparison');
const { requests } = require('../mongo-db');

const makeDecision = async (currentRequest) => {
    const allRequests = INITIAL_MODELS.concat(await requests.findAll());
    const requestsComparisonValues = allRequests.map((request) =>({
        request,
        comparisonValue: compareRequests(request.questions, currentRequest.questions)
    }));

    const maxResult = _.maxBy(requestsComparisonValues, 'comparisonValue');

    if (!maxResult.comparisonValue) return TEAMS.NULL;

    return _.get(maxResult, 'request.resolution');
};

module.exports = {
    makeDecision
};
