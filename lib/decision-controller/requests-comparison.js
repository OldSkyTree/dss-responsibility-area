'use strict';

const _ = require('lodash');
const levenshtein = require('js-levenshtein');

const { LIMIT_LEVENSHTEIN_DISTANCE } = require('./constants');

const compareValuesByLevenshtein = (firstValue, secondValue) => {
    return levenshtein(firstValue, secondValue) > LIMIT_LEVENSHTEIN_DISTANCE ? 0 : 1;
};

const compareValues = (firstValue, secondValue) => {
    firstValue = firstValue.toLowerCase();
    secondValue = secondValue.toLowerCase();

    return compareValuesByLevenshtein(firstValue, secondValue);
};

const compareAnswers = (firstAnswers, secondAnswers) => {
    let comparisonValue = 0;

    firstAnswers = [].concat(firstAnswers);
    secondAnswers = [].concat(secondAnswers);
    const uniqAnswers = _.uniqWith([...firstAnswers, ...secondAnswers], compareValues);

    for (const answer of uniqAnswers) {
        if (firstAnswers.includes(answer) && secondAnswers.includes(answer)) {
            comparisonValue += 1;
        }
    }

    return comparisonValue / uniqAnswers.length;
};

const compareRequests = (firstRequest, secondRequest) => {
    let comparisonValue = 0;

    const firstQuestions = Object.keys(firstRequest);
    const secondQuestions = Object.keys(secondRequest);
    const uniqQuestions = _.uniq([...firstQuestions, ...secondQuestions]);

    for (const question of uniqQuestions) {
        if (firstQuestions.includes(question) && secondQuestions.includes(question)) {
            comparisonValue += compareAnswers(
                _.get(firstRequest[question], 'answer'),
                _.get(secondRequest[question], 'answer')
            );
        }
    }

    return comparisonValue / uniqQuestions.length;
};

module.exports ={
    compareRequests
};
