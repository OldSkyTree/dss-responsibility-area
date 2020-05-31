'use strict';

const { MongoClient } = require('mongodb');
const config = require('../../.config/mongodb');

// 30 seconds is max reconnect time (30 * 1000) and connect timeout.
const WRITE_TIMEOUT = 30000;

/**
 * @returns {Promise<mongodb.MongoClient>}
 */
const connect = async () => {
    const { username, password, hostname, replicaSet, database } = config;
    const uri = username ? `mongodb://${username}:${password}@${hostname}` : `mongodb://${hostname}`;

    return MongoClient.connect(uri, {
        w: 'majority',
        wtimeout: WRITE_TIMEOUT,
        j: true,
        readConcern: { level: 'majority' },
        readPreference: 'primary',
        replicaSet,
        authSource: database,
        useNewUrlParser: true
    });
};

/**
 * @var {mongodb.MongoClient|null}
 */
let connection = null;

/**
 * Returns new or already existing connection.
 *
 * @returns {Promise<mongodb.MongoClient>}
 */
const getConnection = async () => {
    if (connection) {
        return connection;
    }

    connection = await connect();

    return connection;
};

/**
 * @returns {Promise<mongodb.Db>}
 */
const getDatabase = async () => {
    return (await getConnection()).db(config.database);
};

/**
 * Creates collections and indices.
 *
 * @returns {Promise}
 */
const initialize = async () => {
    const db = await getDatabase();

    await db.createCollection('requests');

    await db.createIndex('requests', {
        tiketId: 1
    }, {
        unique: true,
        dropDups: false
    });
};

/**
 * Closes connection if it was open.
 *
 * @returns {void}
 */
const close = () => {
    if (connection) {
        connection.close();
    }
};

module.exports = {
    initialize,
    getDatabase,
    close
};
