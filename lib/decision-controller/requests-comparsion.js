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
    let comparsionValue = 0;

    firstAnswers = [].concat(firstAnswers);
    secondAnswers = [].concat(secondAnswers);

    for (const firstAnswer of firstAnswers) {
        for (const secondAnswer of secondAnswers) {
            if (firstAnswer && secondAnswer) {
                comparsionValue += compareValues(firstAnswer, secondAnswer);
            }
        }
    }

    return comparsionValue;
};

const compareRequests = (firstRequest, secondRequest) => {
    let comparsionValue = 0;

    const firstQuestions = Object.keys(firstRequest);
    const secondQuestions = Object.keys(secondRequest);
    const allQuestions = _(firstQuestions)
        .concat(secondQuestions)
        .uniq()
        .value();

    for (const question of allQuestions) {
        if (firstQuestions.includes(question) && secondQuestions.includes(question)) {
            comparsionValue += compareAnswers(firstRequest[question], secondRequest[question]);
        }
    }

    return comparsionValue / allQuestions.length;
};

module.exports ={
    compareRequests
};
