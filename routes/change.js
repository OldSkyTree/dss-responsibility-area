'use strict';

const boom = require('boom');
const withAsyncHandler = require('async-middleware').wrap;
const debug = require('debug')('dss-responsibility-area:routes:change');

const { requests } = require('../lib/mongo-db');
const { getTeam } = require('./utils');

module.exports = withAsyncHandler(async (req, res) => {
    try {
        debug('handling change event...');

        const { ticketId, ticketComponents } = req;

        const request = await requests.find(ticketId);
        const newTeamName = getTeam(ticketComponents);

        await requests.update(ticketId, {
            oldResolution: request.resolution,
            resolution: newTeamName
        });

        res.json({ message: 'Event change was handled successfully' });
    } catch (error) {
        debug(`an error occured on handling: ${error.message}`);

        throw boom.internal(error);
    }
});
