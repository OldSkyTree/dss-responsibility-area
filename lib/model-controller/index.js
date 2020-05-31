'use strict';

const schema = require('./schema.json');

const create = (req) => {
    const { ticketId, request, updatedAt } = req.ticketInfo;
    const model = {
        updatedAt,
        ticketId,
        questions: {}
    };

    for (const question of Object.keys(request)) {
        const { name, type } = schema[question];

        model.questions[name] = {
            type,
            question,
            answer: request[question]
        };
    }

    return model;
};

module.exports = {
    create
};
