'use strict';

const schema = require('./schema.json');

const create = async (req) => {
    const { datetime, ticketID } = req;
    const model = {
        datetime,
        id: ticketID,
        questions: {}
    };

    for (const question of Object.keys(req.request)) {
        const { name, type } = schema[question];

        model.questions[name] = { type, raw: question };
    }

    return model;
};

module.exports = {
    create
};
