'use strict';

const _ = require('lodash');

const parseStringToArray = (string) => {
    return string.split(', ');
};

const parseFormsAnswers = (description) => {
    const answersAndQuestions = description.split('\n\n');

    return answersAndQuestions.reduce((result, answerAndQuestion) => {
        const [question, answer] = answerAndQuestion.split('\n');
        const parsedQuestion = question.slice(0, -1);
        const parsedAnswer = parseStringToArray(answer);

        result[parsedQuestion] = parsedAnswer.length === 1 ? answer : parsedAnswer;

        return result;
    }, {});
};

const mounths = ['января','февраля','марта','апреля','мая','июня','июля','августа','сентября','октября','ноября','декабря'];

const parseDateTime = (string) => {
    const [date, mounthRus, year, , time] = string.split(' ');
    const mounthIndex = mounths.findIndex((mounth) => mounth === mounthRus);
    const [hours, minutes] = time.split(':');

    return new Date(year, mounthIndex, date, hours, minutes);
};

module.exports = (req, res, next) => {
    req.ticketInfo = _.pickBy(req.body, (value, key) => key !== 'ticket' && key.startsWith('ticket'));

    const { ticketDescription, ticketComponents, ticketUpdatedAt } = req.ticketInfo;

    ticketUpdatedAt && (req.ticketInfo.updatedAt = parseDateTime(ticketUpdatedAt));
    ticketComponents && (req.ticketInfo.teamComponent = parseStringToArray(ticketComponents)[0]);
    ticketDescription && (req.ticketInfo.request = parseFormsAnswers(ticketDescription));

    next();
};
