'use strict';

const boom = require('boom');
const withAsyncHandler = require('async-middleware').wrap;
const debug = require('debug')('dss-responsibility-area:routes:change');

const { requests } = require('../lib/mongo-db');
const { getTeam, getComponent } = require('./utils');
const { TEAMS } = require('../lib/decision-controller/constants');
const TrackerApi = require('../lib/ya-tracker-api');

const trackerApi = new TrackerApi();

module.exports = withAsyncHandler(async (req, res) => {
    try {
        debug('handling change event...');

        const { ticketId, teamComponent, updatedAt } = req.ticketInfo;

        const request = await requests.find(ticketId);
        const newTeamName = getTeam(teamComponent);

        if (newTeamName === request.resolution) {
            console.log(`Event change is skipped for ticket: ${ticketId}`);
            res.json({ message: `Event change is not allowed for ticket: ${ticketId}` });

            return;
        }

        await requests.update(ticketId, {
            updatedAt,
            oldResolution: request.resolution,
            resolution: newTeamName
        });

        console.log(await requests.findAll());

        await trackerApi.issues.modifyIssue(request.ticketId, {
            components: { set: [ getComponent(newTeamName), getComponent(TEAMS.CHANGED) ] }
        });

        res.json({ message: 'Event change was handled successfully' });
    } catch (error) {
        debug(`an error occured on handling: ${error.message}`);

        throw boom.internal(error);
    }
});
