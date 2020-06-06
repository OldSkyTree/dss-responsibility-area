'use strict';

const parseFormsAnswers = (description) => {
    const answersAndQuestions = description.split('\n\n');

    return answersAndQuestions.reduce((result, answerAndQuestion) => {
        const [question, answer] = answerAndQuestion.split('\n');
        const parsedAnswer = answer.split(', ');

        result[question] = parsedAnswer.length === 1 ? answer : parsedAnswer;

        return result;
    }, {});
};

module.exports = (req, res, next) => {
    const { ticketDescription } = req.body;

    if (ticketDescription) {
        req.request = parseFormsAnswers(ticketDescription);
    }

    next();
};
