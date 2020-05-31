'use strict';

const boom = require('boom');
const withAsyncHandler = require('async-middleware').wrap;
const debug = require('debug')('dss-responsibility-area:routes:create');

const { makeDecision } = require('../lib/decision-controller');
const modelController = require('../lib/model-controller');
const { requests } = require('../lib/mongo-db');
const TrackerApi = require('../lib/ya-tracker-api');
const { getComponent } = require('./utils');

const trackerApi = new TrackerApi();

module.exports = withAsyncHandler(async (req, res) => {
    try {
        debug('handling create event...');

        const request = modelController.create(req);
        const teamName = await makeDecision(request);

        await requests.create({
            ...request,
            resolution: teamName
        });

        console.log(await requests.findAll());

        await trackerApi.issues.modifyIssue(request.ticketId, {
            components: { set: [ getComponent(teamName) ] }
        });

        res.json({ message: 'Event create was handled successfully' });
    } catch (error) {
        debug(`an error occured on handling: ${error.message}`);

        throw boom.internal(error);
    }
});
