'use strict';

const { getDatabase } = require('./storage');
const { fakeDb } = require('../../.config/mongodb');
const FakeDB = require('./fake-db');

let fakeDBInstance = null;

/**
 * @returns {Promise<mongodb.Collection>}
 */
const getRequestsCollection = async () => {
    if (fakeDb) {
        return fakeDBInstance || (fakeDBInstance = FakeDB.create());
    }

    return (await getDatabase()).collection('requests');
};

/**
 * @param {Object} model
 * @returns {Promise}
 */
const create = async (request) => {
    const requests = await getRequestsCollection();

    return requests.insertOne(request);
};

/**
 * @param {Object} model
 * @returns {Promise}
 */
const update = async (ticketId, request) => {
    const requests = await getRequestsCollection();

    return requests.updateOne({ ticketId }, { $set: request });
};

/**
 * @param {string} ticketId
 * @returns {Promise}
 */
const find = async (ticketId) => {
    const requests = await getRequestsCollection();

    return requests.findOne({ ticketId });
};

/**
 * @returns {Promise}
 */
const findAll = async() => {
    const requests = await getRequestsCollection();

    return (await requests.find({})).toArray();
}

module.exports = {
    create,
    update,
    find,
    findAll
};
