'use strict';

const boom = require('boom');
const withAsyncHandler = require('async-middleware').wrap;
const debug = require('debug')('dss-responsibility-area:routes:create');
const trackerClient = require('ya-tracker-api-client');

const { requests } = require('../lib/mongo-db');
const modelController = require('../lib/model-controller');
const { makeDecision } = require('../lib/decision-controller');
const { getComponent } = require('./utils');

module.exports = withAsyncHandler(async (req, res) => {
    try {
        debug('handling create event...');

        const request = await modelController.create(req);
        const teamName = makeDecision(request);

        await requests.create({
            ...request,
            resolution: teamName
        });

        await trackerClient.issues.patch(request.ticketId, {
            components: { set: [ getComponent(teamName) ] }
        });

        res.json({ message: 'Event create was handled successfully' });
    } catch (error) {
        debug(`an error occured on handling: ${error.message}`);

        throw boom.internal(error);
    }
});
